import { Card, __Card } from "./card.mjs";
import {isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";

const StaticHandler = {
    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        let str_args = args.map(value => JSON.stringify(value)).join("\x1b[36m, \x1b[0m")
        console.debug(`\x1b[36mnew ${target.name.replace("__", "")}(\x1b[0m${str_args}\x1b[36m)\x1b[0m`);
        function invariant(args, action) {
            // raise an error if invalid arguments
            let err_args = args.map(value => JSON.stringify(value)).join(", ")
            if (args.length === 0 || args.length > 3)
                throw new Error(`\x1b[31mInvalid arguments: Card(${err_args})\x1b[0m`);
        }
        //invariant(args, 'arguments');

        return new target(...args);
    }
};

const InstanceHandler = {
    // traps the 'delete' operator
    deleteProperty(target, prop) {
        console.debug(`\x1b[36m${target.constructor.name}.deleteProperty(\x1b[0m${prop}\x1b[36m)\x1b[0m`);
        if (prop in target) {
            delete target[prop];
            console.debug(`\x1b[36m  ⤷ Deleted property: \x1b[32m${prop}\x1b[0m`);
        }
    },

    get: function (target, prop, receiver) {
        let str_prop = prop.toString()
        console.debug(`\x1b[36m${target.constructor.name}.get(\x1b[0m${str_prop}\x1b[36m)\x1b[0m`);
        let gotten = Reflect.get(...arguments);
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(gotten)}\x1b[0m`);
        return gotten
    },

    // traps the '.' operator when assigning a class's property/attribute
    set(obj, prop, value) {
        let str_val = JSON.stringify(value);
        let str_prop = JSON.stringify(prop)
        console.debug(`\x1b[36m${obj.constructor.name}.\x1b[0m${str_prop}\x1b[36m = \x1b[0m${str_val}\x1b[36m;\x1b[0m`);
        let set_result = Reflect.set(...arguments);
        console.debug(`\x1b[36m  ⤷ ${prop} set to: \x1b[32m${str_val}\x1b[0m`);
        return set_result;
    },

    // Traps the 'in' operator
    has(target, key) {
        console.debug(`\x1b[0m${JSON.stringify(key)}\x1b[36m in \x1b[0m${target.constructor.name}\x1b[0m`);
        let found = key in target;
        let valueFound = key === target.value;
        let suitFound = key === target.suit;
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(found)}\x1b[0m`);
        return found || valueFound || suitFound;
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        let val = JSON.stringify(descriptor);
        console.debug(`\x1b[36m  ⤷ Defining: ${target.constructor.name}\x1b[36m.\x1b[0m${key}\x1b[36m = \x1b[0m${val}`);

        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property ${action} starting with '_'`);
        }

        // example
        //invariant(key, 'definition');
        return Reflect.defineProperty(...arguments);
    }
};



class __SolitaireCard extends __Card{
    static backImageUrl = "unknown";
    static solitaireJSON = null;
    constructor(suit, rank, frontImageUrl=null){
        super(`${rank} of ${suit}`, frontImageUrl);
        this.rank = rank;
        this.suit = suit;
        this.element = null;
        this.status = __SolitaireCard.backImageUrl;
        return new Proxy(this, InstanceHandler);
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
        let cardElement = document.createElement('div');
        let frontDiv = document.createElement('div');
        let backDiv = document.createElement('div');
        let frontImageElement = document.createElement('img');
        let backImageElement = document.createElement('img');

        cardElement.setAttribute('class', 'card')
        frontDiv.setAttribute('class', 'card-side front');
        backDiv.setAttribute('class', 'card-side back');

        frontDiv.dataset.suit = suit;
        frontDiv.dataset.rank = rank;
        frontImageElement.setAttribute('alt', `${rank} of ${suit}`);
        if (solitaireJSON === null)
            __SolitaireCard.solitaireJSON = await getSolitaireJson();
        frontImageElement.setAttribute('src', '../src/themes' + __SolitaireCard.solitaireJSON[suit][rank]);
        frontDiv.appendChild(frontImageElement);

        backDiv.dataset.suit = 'hidden';
        backDiv.dataset.rank = 'hidden';
        backImageElement.setAttribute('alt', `hidden`);
        if (solitaireJSON === null)
            __SolitaireCard.solitaireJSON = await getSolitaireJson();
        backImageElement.setAttribute('src', '../src/themes' + __SolitaireCard.solitaireJSON['backside']);
        backDiv.appendChild(backImageElement);

        cardElement.appendChild(frontDiv);
        cardElement.appendChild(backDiv);
        this.element = cardElement;
        return this.element;
    }

    async addCardAsChildToElement(element){
        this.element ||= this.createCardElement();
        element.appendChild(this.element);
    }

    flip(){
        // TODO: monday
        //  https://www.30secondsofcode.org/css/s/rotating-card
        //  https://www.w3schools.com/howto/howto_css_flip_card.asp
        //  https://3dtransforms.desandro.com/card-flip
        if (this.status === __SolitaireCard.backImageUrl)
            this.status = `${this.name}`;
        else
            this.status = __SolitaireCard.backImageUrl;
    }

    drag(){
        //TODO: monday
        // https://www.w3schools.com/howto/howto_js_draggable.asp
        // https://codepen.io/mgmarlow/pen/YwJGRe?editors=1010
        // https://javascript.plainenglish.io/using-javascript-to-create-trello-like-card-re-arrange-and-drag-and-drop-557e60125bb4
        // https://web.dev/drag-and-drop/
    }

    contains(other){
        if (other instanceof Card)
            return this.equals(other);
        else {
            for (const property in this) {
                if (this[property] === other)
                    return true;
            }
        }
        return false;
    }

    toString(){
        if (this.status === __SolitaireCard.backImageUrl)
            return `<SolitareCard(${this.status})>`;
        else if (this.suit === 'Hearts' || this.suit === 'Diamonds')
            return `\x1b[31m[${__SolitaireCard.suits[this.suit]}${this.rank}]\x1b[0m`
        else if (this.suit === 'Clubs' || this.suit === 'Spades')
            return `\x1b[37m[${__SolitaireCard.suits[this.suit]}${this.rank}]\x1b[0m`
        return `<SolitareCard(${this.status})>`;
    }

    repr(){
        let value = JSON.stringify(this.rank);
        let suit = JSON.stringify(this.suit);
        let status = JSON.stringify(this.status);
        return `<SolitaireCard(value=${value}, suit=${suit}, status=${status})>`;
    }

    equals(other){
        if (typeof other !== typeof this)
            return false;
        for (const property in this){
            if (other[property] !== this[property])
                return false;
        }
        return true;
    }

    integer_value(){
        let value = this.rank
        if (typeof value === 'string' || value instanceof String)
            value = value.toLowerCase()[0];
        switch (value){
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

    compare(other){
        // return -1, 0, or 1
        if (typeof other !== typeof this)
            throw new Error(`Can't compare ${other} to ${this}.`);
        if (other.suit !== this.suit) {
            console.warn(`\x1b[33m[WARNING]: Compared both cards but they don't have the same suit: \n\t${this.repr()}\n\t${other.repr()}\x1b[0m`);
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

    greaterThan(other){
        return this.compare(other) === 1
    }

    lessThan(other){
        return this.compare(other) === -1;
    }

    greaterThanEq(other){
        let cmp = this.compare(other)
        return cmp === 1 || cmp === 0;
    }

    lessThanEq(other){
        let cmp = this.compare(other)
        return cmp === -1 || cmp === 0;
    }
}

let SolitaireCard = new Proxy(__SolitaireCard, StaticHandler);


export { SolitaireCard, __SolitaireCard }
