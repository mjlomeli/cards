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
        if (key in target)
            return true;
        let found = false;
        for (let i = 0; i < target.cards.length; i++) {
            if (key in target.cards[i])
                return true;
        }
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(found)}\x1b[0m`);
        return found;
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


import {product} from "./utilities/cartesian_product.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";

class __Deck {
    static ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    static suits = ['hearts', 'spades', 'diamonds', 'clubs']
    static json_index = require('../themes/solitaire/index.json');
    constructor(){
        let pairs = product(__Deck.suits, __Deck.ranks);
        this.cards = pairs.map(pair =>{
            let [rank, suit] = pair;
            let imgUrl = __Deck.json_index[suit][rank];
            return new SolitaireCard(suit, rank, imgUrl);
        });
        return new Proxy(this, InstanceHandler);
    }

    length(){
        return this.cards.length;
    }

    repr(){
        return `<Deck(length=${this.cards.length}, cards=[...])>`;
    }

    push(card){
        this.cards.push(card)
    }

    toString(){
        let s = `<Deck(length=${this.cards.length}, cards=[`
        this.cards.forEach((card, index) =>{
            if (index % 13 === 0)
                s += "\n\t";
            s += ` ${card} `;
        });
        s += "]>";
        return s;
    }

    contains(card) {
        for (let i = 0; i < this.cards; i++)
            if (typeof card == 'string' || card instanceof String && card in this.cards[i])
                return true;
            else if (this.cards[i] === card)
                return true;
        return false;
    }

    shuffle(){
        //Durstenfeld Shuffle: https://bost.ocks.org/mike/shuffle/
        let i = this.cards.length;
        let random_i;
        while (i !== 0) {
            random_i = Math.floor(Math.random() * i--);
            [this.cards[i], this.cards[random_i]] = [this.cards[random_i], this.cards[i]];
        }
    }

    top(){
        return this.cards[0];
    }

    bottom(){
        return this.cards[this.cards.length - 1];
    }

    remaining(){
        return this.cards.length;
    }

    draw(num=1){
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")
        return this.cards.splice(0, num);
    }

    drawFromBottom(){
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")
        return this.cards.pop();
    }

    addToTop(card){
        this.cards.unshift(card);
    }

    addToBottom(card){
        this.cards.push(card);
    }

    addToRandom(card){
        let index = Math.floor(Math.random() * this.cards.length);
        this.cards.splice(index, 0, card);
    }

    drawWhere(callback, num=13){
        let drawn_cards = [];
        let i = 0;
        while (num > 0 && i < this.cards.length){
            if (callback(this.cards[i])){
                drawn_cards = drawn_cards.concat(this.cards.splice(i, 1));
                num--;
            }
            else {
                i++;
            }
        }
        return drawn_cards;
    }

    drawRandom(num=1){
        let index = Math.floor(Math.random() * this.cards.length)
        let number = (this.cards.length > num) ? num : this.cards.length;
        this.cards.splice(index, number);
    }
}

let Deck = new Proxy(__Deck, StaticHandler);


export { Deck, __Deck }