/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */

import {SolitaireDeck} from "./solitaire_deck.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {Card} from "./card.mjs";
import {Deck} from "./deck.mjs";
import {Board} from "./board.mjs";

class SolitaireBoard {
    constructor() {
        this.board = null;
        this.rootElement = null;

        this.tableauCount = 7;
        this.tableauLength = 13;
        this.tableau = null;
        this.tableuElement = null;

        this.foundationCount = 4;
        this.foundations = null;

        this.stock = null; // the face down deck
        this.stockCard = null;
        this.stockElement = null;

        this.talon = new Deck(); // drawn the face up cards
    }

    async buildBoard() {
        this.board = new Board('stock talon hearts clubs diamonds spades',
            'tableu tableu tableu tableu tableu tableu');
        this.board.buildBoard();

        this.tableau = new Board('tableu1 tableu2 tableu3 tableu4 tableu5 tableu6 tableu7');
        this.tableau.buildBoard();
        this.tableuElement = this.tableau.rootElement;
        this.board.index['tableu'] = this.tableu.index;

        this.createTableau();
        this.createFoundations();
        await this.createStock();
        this.createTalon();
    }

    createTableau() {
        let tab = this.board.index['tableu'];
        // add blank cards
        tab.areas.forEach((t, i) => {
           tab.index[t].textContent = `tableu${i}`
        });
    }

    createFoundations() {
        // add blank cards to each for visual placement
        this.board.index['hearts'].textContent = "hearts";
        this.board.index['spades'].textContent = "spades";
        this.board.index['diamonds'].textContent = "diamonds";
        this.board.index['clubs'].textContent = "clubs";
    }

    async createStock(){
        this.stock = new SolitaireDeck();
        this.stock.shuffle();

        let json = await SolitaireCard.getSolitaireJson();
        this.stockCard = new Card(json['backside'], json['backside']);
        this.stockCard.buildCard();
        this.stockElement = this.stockCard.rootElement;

        this.board['stock'].append(this.stockElement);
    }
}


export default Board