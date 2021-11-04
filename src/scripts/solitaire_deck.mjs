import {product} from "./utilities/utilities.mjs";
import {Deck} from "./deck.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";

class SolitaireDeck extends Deck {
    static ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    static suits = ['hearts', 'spades', 'diamonds', 'clubs']
    constructor(){
        // TODO: check if the image url loads correctly
        super();
        let pairs = product(1, SolitaireDeck.suits, SolitaireDeck.ranks)
        this.cards = pairs.map(pair => new SolitaireCard(...pair))
    }

    push(card){
        this.cards.push(card)
    }

    repr(){
        let cards = this.cards.map((c, i) => {
            if (i < this.cards.length - 1)
                return `\n\t(${c.rank},${c.suit}),`
            else
                `\n\t(${c.rank},${c.suit})\n`
        });
        return `<Deck(length=${this.cards.length}, cards=[${cards}])>`;
    }

    toString(){
        return this.repr();
    }

    contains(card) {
        for (let i = 0; i < this.cards; i++)
            if ((typeof card === 'string' || card instanceof String) && card in this.cards[i])
                return true;
            else if (this.cards[i] === card || card in this.cards[i])
                return true;
        return false;
    }

    async assuredCardBuild(card) {
        if (card.rootElement === null)
            await card.buildSolitaire();
        return card;
    }

    async top() {
        return await this.assuredCardBuild(this.cards[0]);
    }

    async bottom(){
        let card = this.cards[this.cards.length - 1];
        return await this.assuredCardBuild(card);
    }

    remaining(){
        return this.cards.length;
    }

    async draw(num = 1) {
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")

        let cards = this.cards.splice(0, num);
        for (let card of cards)
            await this.assuredCardBuild(card);
        return cards;
    }

    async drawFromBottom() {
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")
        let card = this.cards.pop();
        return await this.assuredCardBuild(card);
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

    async drawRandom(num = 1) {
        let index = Math.floor(Math.random() * this.cards.length)
        let number = (this.cards.length > num) ? num : this.cards.length;
        let cards = this.cards.splice(index, number);
        for (let card of cards) {
            await this.assuredCardBuild(card);
        }
        return cards;
    }

    veryEasyShuffle() {
        let orders = [2, 4, 5, 6, 7, 7, 7, 2, 3, 5, 6, 6, 7, 2, 3, 4, 5,
            6, 'ace', 3, 4, 5, 'ace', 3, 4, 'ace', 2, 'ace'];
        let front = [];
        orders.forEach(rank => {
            let found = this.drawWhere(1, card => card.rank === rank);
            front = front.concat(found);
        })
        this.cards = front.concat(this.cards);
    }
    easyShuffle(){
        this.veryEasyShuffle()
        this.shuffle(5);
    }
    mediumShuffle(){
        this.veryEasyShuffle();
        this.shuffle(10);
    }
    hardShuffle(){
        this.shuffle();
    }
}

export { SolitaireDeck }