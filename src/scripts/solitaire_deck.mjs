import {product} from "./utilities/cartesian_product.mjs";
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
}

export { SolitaireDeck }