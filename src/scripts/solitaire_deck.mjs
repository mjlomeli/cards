import {product} from "./utilities/cartesian_product.mjs";
import {Deck} from "./deck.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";

class SolitaireDeck extends Deck {
    static ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    static suits = ['hearts', 'spades', 'diamonds', 'clubs']
    static solitaireJSON = null;
    constructor(){
        // TODO: check if the image url loads correctly
        super();
        let pairs = product(1, SolitaireDeck.suits, SolitaireDeck.ranks)
        this.cards = pairs.map(pair => new SolitaireCard(...pair))
    }

    async build() {
        // all async elements should be defined here
        if (SolitaireDeck.solitaireJSON === null)
            SolitaireDeck.solitaireJSON = await this.getSolitaireJson();
        await this.createDeckElement();
    }

    getSolitaireJson() {
        /*
            Must use keyword 'await' to use this.
            Ex:
                let deckIndex = await locateIndexJson();
         */
        let path = projectDirectory('cards') + '/src/themes/solitaire/index.json';
        if (isNodeJs()) {
            return openJson(path)
        } else if (isBrowser()) {
            // openJson returns a promise so await must be added to the caller.
            return openJson(path)
        }
        return {};
    }

    async createCardElement() {
        // Create the parts of the card
        this.cardElement = document.createElement('div');
        this.backElement = document.createElement('div');
        let backImageElement = document.createElement('img');

        // Add meta data
        this.cardElement.id = `deck`;
        this.cardElement.setAttribute('class', 'card')
        this.backElement.setAttribute('class', 'card-side back');

        // Edit the back card
        this.backElement.dataset.suit = 'hidden';
        this.backElement.dataset.rank = 'hidden';
        backImageElement.setAttribute('alt', `hidden`);
        if (SolitaireDeck.solitaireJSON === null)
            SolitaireDeck.solitaireJSON = await this.getSolitaireJson();
        backImageElement.setAttribute('src', '../src/themes' + SolitaireDeck.solitaireJSON['backside']);
        this.backElement.appendChild(backImageElement);

        this.cardElement.appendChild(this.frontElement);
        this.cardElement.appendChild(this.backElement);
    }
}

export { Deck }