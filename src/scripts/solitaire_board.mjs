/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */
import {debug} from "./utilities/utilities.mjs";
import {SolitaireDeck} from "./solitaire_deck.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {Card} from "./card.mjs";
import {Deck} from "./deck.mjs";
import {Board} from "./board.mjs";

class SolitaireBoard {
    static solitaireJSON = null;
    constructor(difficulty) {
        this.board = null;
        this.rootElement = null;
        this.difficulty = difficulty;

        this.tableauCount = 7;
        this.tableauLength = 13;
        this.tableauBoard = null;    // type: Board, 7 stacks to place into
        this.tableauElement = null;

        this.foundations = ['hearts', 'diamonds', 'spades', 'clubs'];
        this.foundationCardIndex = null;
        this.foundationDeckIndex = null;

        this.stock = null; // the face down deck
        this.stockCard = null;
        this.stockElement = null;

        this.talon = null; // the face up drawn cards
        this.talonCard = null;
        this.talonElement = null;

        this.cardIndex = {};
    }


    async buildSolitaireBoard() {
        this.board = new Board('stock talon hearts clubs diamonds spades',
            'tableau tableau tableau tableau tableau tableau');
        this.board.buildBoard();
        this.rootElement = this.board.rootElement;

        SolitaireBoard.solitaireJSON = await SolitaireCard.getSolitaireJson()

        this.createFoundations();
        this.createStock();
        this.createTalon();
        await this.createTableau();
    }

    async createTableau() {
        this.tableauBoard = new Board('tableau1 tableau2 tableau3 tableau4 tableau5 tableau6 tableau7');
        this.tableauBoard.buildBoard();
        this.tableauElement = this.tableauBoard.rootElement;
        this.board.elementIndex['tableau'].appendChild(this.tableauElement);

        // add blank cards
        this.tableauBoard.areas.forEach((t, i) => {
            let card = new Card(
                'src/themes' + SolitaireBoard.solitaireJSON['empty'],
                'src/themes' + SolitaireBoard.solitaireJSON['empty']);
            card.buildCard();
            card.rootElement.id = t;

            this.tableauBoard.elementIndex[t].appendChild(card.rootElement);
        });

        for (let i = 0; i < 7; i++){
            for (let j = i; j < 7; j++) {
                let cards = await this.stock.draw();
                let card = cards[0];
                let tabIndex = `tableau${j+1}`
                this.cardIndex[card.id] = card;
                SolitaireBoard.setDeckData(card, tabIndex)
                card.rootElement.classList.add('card-slide');
                let tableauElement = this.tableauBoard.elementIndex[tabIndex];
                let tableauDeck = this.tableauBoard.deckIndex[tabIndex];
                if (tableauDeck.length() > 0) {
                    let top = tableauDeck.top();
                    top.flip();
                }
                tableauDeck.addToTop(card);
                tableauElement.appendChild(card.rootElement);
            }
        }

        
    }

    createFoundations() {
        
        // hearts blank card
        let hearts = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['hearts']['foundation'],
            'src/themes' + SolitaireBoard.solitaireJSON['backside']);
        hearts.buildCard();
        hearts.rootElement.id = "hearts";
        this.board.elementIndex['hearts'].appendChild(hearts.rootElement);

        // spades blank card
        let spades = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['spades']['foundation'],
            'src/themes' + SolitaireBoard.solitaireJSON['backside']);
        spades.buildCard();
        spades.rootElement.id = "spades";
        this.board.elementIndex['spades'].appendChild(spades.rootElement);

        // diamonds blank card
        let diamonds = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['diamonds']['foundation'],
            'src/themes' + SolitaireBoard.solitaireJSON['backside']);
        diamonds.buildCard();
        diamonds.rootElement.id = "diamonds";
        this.board.elementIndex['diamonds'].appendChild(diamonds.rootElement);

        // clubs blank card
        let clubs = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['clubs']['foundation'],
            'src/themes' + SolitaireBoard.solitaireJSON['backside']);
        clubs.buildCard();
        clubs.rootElement.id = "clubs";
        this.board.elementIndex['clubs'].appendChild(clubs.rootElement);

        this.foundationCardIndex = {'hearts': hearts, 'spades': spades, 'diamonds': diamonds, 'clubs': clubs};
        this.foundationDeckIndex = Object.fromEntries(this.foundations.map(f => [f, new Deck()]));

        
    }

    createStock(){
        this.stock = new SolitaireDeck();
        if (this.difficulty === 'hard')
            this.stock.hardShuffle();
        else
            this.stock.veryEasyShuffle();

        this.stockCard = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['empty'],
            'src/themes' + SolitaireBoard.solitaireJSON['backside']);
        this.stockCard.buildCard();
        this.stockCard.flipDown();
        this.stockElement = this.stockCard.rootElement;
        this.stockElement.id = "stock";

        this.board.elementIndex['stock'].appendChild(this.stockElement);
        this.board.deckIndex['stock'] = this.stock;
        
    }

    createTalon(){
        this.talon = new Deck(); // drawn the face up cards

        this.talonCard = new Card(
            'src/themes' + SolitaireBoard.solitaireJSON['empty'],
            'src/themes' + SolitaireBoard.solitaireJSON['empty']);
        this.talonCard.buildCard();
        this.talonElement = this.talonCard.rootElement;
        this.talonElement.id = "talon";
        this.board.elementIndex['talon'].appendChild(this.talonElement);
        this.board.deckIndex['talon'] = this.talon;
    }

    static setDeckData(card, deckName){
        card.rootElement.dataset.deck = deckName;
        card.frontElement.dataset.deck = deckName;
        card.backElement.dataset.deck = deckName;
        card.frontImageElement.dataset.deck = deckName;
        card.backImageElement.dataset.deck = deckName;
    }
}


export {SolitaireBoard}