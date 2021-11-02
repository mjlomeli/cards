import {Card, __Card} from "./card.mjs";
import {isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";
import {dragElement} from "./utilities/document_utilities.js";

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


class __SolitaireCard extends __Card {
    static backImageUrl = "unknown";
    static solitaireJSON = null;

    constructor(suit, rank, frontImageUrl = null) {
        super(`${rank} of ${suit}`, frontImageUrl);
        if (solitaireJSON === null)
            __SolitaireCard.solitaireJSON = getSolitaireJson();
        this.rank = rank;
        this.suit = suit;
        this.cardElement = null
        this.frontElement = null;
        this.backElement = null;
        this.moved = false;
        this.status = __SolitaireCard.backImageUrl;
        //return new Proxy(this, InstanceHandler);
    }

    async build() {
        // all async elements should be defined here
        await createCardElement();
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
        this.frontElement = document.createElement('div');
        this.backElement = document.createElement('div');
        let frontImageElement = document.createElement('img');
        let backImageElement = document.createElement('img');

        // Add meta data
        this.cardElement.setAttribute('class', 'card')
        this.frontElement.setAttribute('class', 'card-side front');
        this.backElement.setAttribute('class', 'card-side back');

        // Edit front card
        this.frontElement.dataset.suit = suit;
        this.frontElement.dataset.rank = rank;
        frontImageElement.setAttribute('alt', `${rank} of ${suit}`);
        if (__SolitaireCard.solitaireJSON === null)
            __SolitaireCard.solitaireJSON = await getSolitaireJson();
        frontImageElement.setAttribute('src', '../src/themes' + __SolitaireCard.solitaireJSON[suit][rank]);
        this.frontElement.appendChild(frontImageElement);

        // Edit the back card
        this.backElement.dataset.suit = 'hidden';
        this.backElement.dataset.rank = 'hidden';
        backImageElement.setAttribute('alt', `hidden`);
        if (__SolitaireCard.solitaireJSON === null)
            __SolitaireCard.solitaireJSON = await getSolitaireJson();
        backImageElement.setAttribute('src', '../src/themes' + __SolitaireCard.solitaireJSON['backside']);
        this.backElement.appendChild(backImageElement);

        // flip back card to face down, keeping the front face up
        this.backElement.classList.toggle('flip');

        this.cardElement.appendChild(this.frontElement);
        this.cardElement.appendChild(this.backElement);
        return this.cardElement;
    }

    flip() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        // classList access the css, we use .flip (note: doesn't need to have the same class name)
        if (!this.moved) {
            this.backElement.classList.toggle("flip");
            this.frontElement.classList.toggle("flip");
        }
    }

    enableFlippingOnClick() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');
        this.cardElement.addEventListener("click", this.flip);
    }

    disableFlippingOnClick() {
        this.cardElement.removeEventListener("click", this.flip)
    }

    addCardAsChildToElement(element) {
        this.element ||= this.createCardElement();
        element.appendChild(this.element);
    }

    drag() {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        this.cardElement.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            this.moved = false;
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            this.moved = true;
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    enableDragOnMouseClickHold() {

    }

    disableDragOnMouseClickHold() {

    }

    contains(other) {
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

    toString() {
        if (this.status === __SolitaireCard.backImageUrl)
            return `<SolitareCard(${this.status})>`;
        else if (this.suit === 'Hearts' || this.suit === 'Diamonds')
            return `\x1b[31m[${__SolitaireCard.suits[this.suit]}${this.rank}]\x1b[0m`
        else if (this.suit === 'Clubs' || this.suit === 'Spades')
            return `\x1b[37m[${__SolitaireCard.suits[this.suit]}${this.rank}]\x1b[0m`
        return `<SolitareCard(${this.status})>`;
    }

    repr() {
        let value = JSON.stringify(this.rank);
        let suit = JSON.stringify(this.suit);
        let status = JSON.stringify(this.status);
        return `<SolitaireCard(value=${value}, suit=${suit}, status=${status})>`;
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

let SolitaireCard = new Proxy(__SolitaireCard, StaticHandler);


export {SolitaireCard, __SolitaireCard}
