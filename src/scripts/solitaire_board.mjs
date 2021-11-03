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
    static solitaireJSON = null;
    constructor() {
        this.board = null;
        this.rootElement = null;

        this.tableauCount = 7;
        this.tableauLength = 13;
        this.tableau = null;    // 7 stacks to place into
        this.tableauElement = null;

        this.foundationCount = 4;
        this.foundations = null; // finished cards

        this.stock = null; // the face down deck
        this.stockCard = null;
        this.stockElement = null;

        this.talon = null; // the face up drawn cards
        this.talonCard = null;
        this.talonElement = null;
    }

    async buildSolitaireBoard() {
        this.board = new Board('stock talon hearts clubs diamonds spades',
            'tableau tableau tableau tableau tableau tableau');
        this.board.buildBoard();
        this.rootElement = this.board.rootElement;

        SolitaireBoard.solitaireJSON = await SolitaireCard.getSolitaireJson()

        this.createTableau();
        this.createFoundations();
        this.createStock();
        this.createTalon();
    }

    createTableau() {
        this.tableau = new Board('tableau1 tableau2 tableau3 tableau4 tableau5 tableau6 tableau7');
        this.tableau.buildBoard();
        this.tableauElement = this.tableau.rootElement;
        this.board.index['tableau'].appendChild(this.tableauElement);

        // add blank cards
        this.tableau.areas.forEach((t, i) => {
            let card = new Card(
                '../src/themes' + SolitaireBoard.solitaireJSON['empty'],
                '../src/themes' + SolitaireBoard.solitaireJSON['empty']);
            card.buildCard();

            this.tableau.index[t].appendChild(card.rootElement);
        });
    }

    createFoundations() {
        // hearts blank card
        let hearts = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['hearts']['foundation'],
            '../src/themes' + SolitaireBoard.solitaireJSON['hearts']['foundation']);
        hearts.buildCard();
        this.board.index['hearts'].appendChild(hearts.rootElement);

        // spades blank card
        let spades = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['spades']['foundation'],
            '../src/themes' + SolitaireBoard.solitaireJSON['spades']['foundation']);
        spades.buildCard();
        this.board.index['spades'].appendChild(spades.rootElement);

        // diamonds blank card
        let diamonds = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['diamonds']['foundation'],
            '../src/themes' + SolitaireBoard.solitaireJSON['diamonds']['foundation']);
        diamonds.buildCard();
        this.board.index['diamonds'].appendChild(diamonds.rootElement);

        // clubs blank card
        let clubs = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['clubs']['foundation'],
            '../src/themes' + SolitaireBoard.solitaireJSON['clubs']['foundation']);
        clubs.buildCard();
        this.board.index['clubs'].appendChild(clubs.rootElement);

        this.foundations = {'hearts': hearts, 'spades': spades, 'diamonds': diamonds, 'clubs': clubs};
    }

    createStock(){
        this.stock = new SolitaireDeck();
        this.stock.shuffle();

        this.stockCard = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['backside'],
            '../src/themes' + SolitaireBoard.solitaireJSON['backside']);
        this.stockCard.buildCard();
        this.stockElement = this.stockCard.rootElement;

        this.board.index['stock'].appendChild(this.stockElement);
    }

    createTalon(){
        this.talon = new Deck(); // drawn the face up cards

        this.talonCard = new Card(
            '../src/themes' + SolitaireBoard.solitaireJSON['empty'],
            '../src/themes' + SolitaireBoard.solitaireJSON['empty']);
        this.talonCard.buildCard();
        this.talonElement = this.talonCard.rootElement;

        this.board.index['talon'].appendChild(this.talonElement);
    }
}


export {SolitaireBoard}