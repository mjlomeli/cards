import {Card} from "./card.mjs";
import {isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";
import {dragElement} from "./utilities/document_utilities.js";

class SolitaireCard extends Card {
    static solitaireJSON = null;

    constructor(suit, rank) {
        super();
        this.rank = rank;
        this.suit = suit;
        this.id = `${rank}_of_${suit}`;
        this.color = (['hearts', 'diamonds'].includes(suit)) ? 'red' : 'black';
    }

    static async getSolitaireJson() {
        /*
            Must use keyword 'await' to use this.
            Ex:
                let deckIndex = await getSolitaireJson();
         */
        if (SolitaireCard.solitaireJSON === null) {
            let path = projectDirectory('cards') + '/src/themes/solitaire/index.json';
            SolitaireCard.solitaireJSON = await openJson(path)
        }
        return SolitaireCard.solitaireJSON;
    }

    async buildSolitaire() {
        // all async elements should be defined here
        if (SolitaireCard.solitaireJSON === null)
            SolitaireCard.solitaireJSON = await SolitaireCard.getSolitaireJson();
        this.frontImageUrl = 'src/themes' + SolitaireCard.solitaireJSON[this.suit][this.rank];
        this.backImageUrl = 'src/themes' + SolitaireCard.solitaireJSON["backside"];
        super.buildCard();
        this.createElement();
    }

    createElement() {
        // Add root data
        this.rootElement.id = this.id;

        // Add front data
        this.frontElement.dataset.suit = this.suit;
        this.frontElement.dataset.rank = this.rank;
        this.frontImageElement.setAttribute('alt', `${this.rank} of ${this.suit}`);

        // Add back data
        this.backElement.dataset.suit = 'hidden';
        this.backElement.dataset.rank = 'hidden';
        this.backImageElement.setAttribute('alt', `hidden`);

        return this.rootElement;
    }

    contains(other) {
        if (other instanceof SolitaireCard)
            return this.equals(other);
        else {
            for (const property in this) {
                if (this[property] === other)
                    return true;
            }
        }
        return false;
    }

    toString() {
        return this.repr();
    }

    repr() {
        let value = JSON.stringify(this.rank);
        let suit = JSON.stringify(this.suit);
        return `<SolitaireCard(value=${value}, suit=${suit})>`;
    }

    equals(other) {
        if (typeof other !== typeof this)
            return false;
        for (const property in this) {
            if (other[property] !== this[property])
                return false;
        }
        return true;
    }

    integer_value() {
        let value = this.rank
        if (typeof value === 'string' || value instanceof String)
            value = value.toLowerCase()[0];
        switch (value) {
            case 'a':
                return 1;
            case 'j':
                return 11;
            case 'q':
                return 12;
            case 'k':
                return 13;
            default:
                return parseInt(this.rank);
        }
    }

    compare(other) {
        // return -1, 0, or 1
        if (typeof other !== typeof this)
            throw new Error(`Can't compare ${other} to ${this}.`);
        if (other.suit !== this.suit) {
            // a warning should be raised but removed by request.
            return null;
        }
        let this_integer = this.integer_value();
        let other_integer = other.integer_value();
        if (this_integer < other_integer)
            return -1;
        else if (this_integer === other_integer)
            return 0;
        else
            return 1;
    }

    fitsFoundationOrder(deck){
        let cmp = this.integer_value();
        if (deck.length() === 0)
            return cmp === 1;
        let card = deck.top();
        return this.suit === card.suit && cmp - card.integer_value() === 1;
    }

    fitsTableauOrder(deck){
        let cmp = this.integer_value();
        if (deck.length() === 0)
            return this.rank === 'king';
        let card = deck.top();
        return this.color !== card.color && card.integer_value() - cmp === 1;
    }

    greaterThan(other) {
        return this.compare(other) === 1
    }

    lessThan(other) {
        return this.compare(other) === -1;
    }

    greaterThanEq(other) {
        let cmp = this.compare(other)
        return cmp === 1 || cmp === 0;
    }

    lessThanEq(other) {
        let cmp = this.compare(other)
        return cmp === -1 || cmp === 0;
    }
}

export {SolitaireCard}


