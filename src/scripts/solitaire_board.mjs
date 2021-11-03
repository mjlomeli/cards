/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */

import {SolitaireDeck} from "./solitaire_deck.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {Card} from "./card.mjs";
import {Deck} from "./deck.mjs";

class SolitaireBoard {
    constructor(rows, columns) {
        this.tableauCount = 7;
        this.tableauIndex = {}
        this.tableauLength = 13;
        this.tableau = Array.from(Array(this.tableauCount), () => null);

        this.foundationCount = 4;
        this.foundationIndex = {};
        this.foundations = Array.from(Array(this.foundationCount), () => null);

        this.stock = null; // the face down deck
        this.stockCard = null;
        this.stockElement = null;

        this.talon = new Deck(); // drawn the face up cards
    }

    async buildBoard() {
        this.createTableau();
        this.createFoundations();
        await this.createStock();
        this.createTalon();
    }

    createTableau() {
        this.tableau.forEach((column, index) => {
            column = document.createElement('table');
            this.tableauIndex[index] = {};
            for (let i = 0; i < this.tableauLength; i++) {
                let row = document.createElement('tr');
                let data = document.createElement('data');
                column.appendChild(row);
                row.appendChild(data);
                this.tableauIndex[index][i] = data;
            }
        });
    }

    createFoundations() {
        this.foundations.forEach((column, index) => {
            column = document.createElement('table');
            let row = document.createElement('tr');
            let data = document.createElement('data');
            column.appendChild(row);
            row.appendChild(data);
            this.foundationIndex[index] = data;
        });
    }

    async createStock(){
        this.stock = new SolitaireDeck();
        this.stock.shuffle();

        let json = await SolitaireCard.getSolitaireJson();
        this.stockCard = new Card(json['backside'], json['backside']);
        this.stockCard.buildCard();
        this.stockElement = this.stockCard.rootElement;
    }
}


export default Board