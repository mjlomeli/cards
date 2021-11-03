import {SolitaireBoard} from "./solitaire_board.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {Card} from "./card.mjs";
import {debug} from "./utilities/utilities.mjs";


class SolitaireGame {
    static dropReceivers = {}

    constructor() {
        this.board = null;
        this.rootElement = null;

        this.onStockClick = null;
    }

    async start() {
        this.board = new SolitaireBoard();
        await this.board.buildSolitaireBoard()
        this.rootElement = this.board.rootElement;

        for (let area of this.board.tableauBoard.areas) {
            let tableauElement = this.board.tableauBoard.elementIndex[area];
            let tableauDeck = this.board.tableauBoard.deckIndex[area];
            await SolitaireGame.enableGetsDrop(area, tableauElement, this);
            if (tableauDeck.length() > 0) {
                let card = tableauDeck.top();
                card.enableDragDrop();
            }
        }
    }

    async draw() {
        debug.func("draw", "started");
        if (this.board.stock.length() === 1) {
            this.board.stockCard.flipUp();
            debug.log("last card drew");
        }
        if (this.board.stock.length() > 0) {
            await SolitaireGame.drawFromDeckTo(this.board, "stock", "talon");
            let card = this.board.talon.top();
            this.board.board.elementIndex["talon"].appendChild(card.rootElement);
            card.enableDragDrop();
        }
        debug.func("draw", "ended");
    }

    enableStockDrawOnClick() {
        debug.func("enableStockDrawOnClick", "started")
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        //save the bounded function to be able to remove the event listener later.
        this.onStockClick = this.draw.bind(this);
        this.board.stockElement.addEventListener("click", this.onStockClick);
        debug.func("enableStockDrawOnClick", "finished")
    }

    disableStockDrawOnClick() {
        this.board.stockElement.removeEventListener("click", this.onStockClick)
    }

    static enableGetsDrop(indexId, element, game) {
        debug.func("enableGetsDrop", "started")
        SolitaireGame.dropReceivers[indexId] = element;
        element.ondrop = SolitaireGame.getsDrop.bind(game);
        element.ondragover = SolitaireGame.givesDrop.bind(game);

        debug.log(`enabled getsDrop from ${indexId}`)
        debug.func("enableGetsDrop", "ended")
    }

    static disableGetsDrop(indexId) {
        debug.func("disableGetsDrop", "started")
        SolitaireGame.dropReceivers[indexId].ondrop = null;
        SolitaireGame.dropReceivers[indexId].ondragover = null;
        delete SolitaireGame.dropReceivers[indexId];

        debug.log(`removed getsDrop from ${indexId}`)
        debug.func("disableGetsDrop", "ended");
    }

    static givesDrop(event) {
        //debug.func("givesDrop", "started");
        event.preventDefault();


        let currentTargetId = event.currentTarget.id;
        let targetId = event.target.id;
        let data = event.dataTransfer.getData("Text");

        //debug.data("event.target", event.target);
        //debug.data(`event.target.id`, targetId);
        //debug.data(`event.currentTarget.id`, currentTargetId);
        //debug.data(`event.dataTransfer.getData("Text")`, data);

        //debug.func("givesDrop", "ended");
    }

    static async getsDrop(event) {
        // needs to be static method
        debug.func("getsDrop", "started");
        event.preventDefault();

        let currentTargetId = event.currentTarget.id;
        let targetId = event.target.id;
        let data = event.dataTransfer.getData("Text");

        debug.data("event.target", event.target);
        debug.data(`event.target.id`, targetId);
        debug.data(`event.currentTarget.id`, currentTargetId);
        debug.data(`event.dataTransfer.getData("Text")`, data);

        debug.log(`${currentTargetId} is getting ${data}`);

        if (currentTargetId === '' || currentTargetId === undefined)
            throw new Error("Current target must have an id");
        if (data === '' || data === undefined)
            throw new Error("Draggable object must have an id");

        if (this !== undefined) {
            debug.condition("if", "this != undefined");
            let element = document.getElementById(data)
            let fromDeck = element.dataset.deck
            debug.data("element.dataset.deck", fromDeck);
            await SolitaireGame.drawFromDeckTo(this.board, fromDeck, currentTargetId);
            event.currentTarget.appendChild(element);
        }

        debug.func("getsDrop", "ended");
    }


    static async drawFromDeckTo(board, fromDeckName, toDeckName) {
        let fromDeck = SolitaireGame.getDeck(board, fromDeckName);
        let toDeck = SolitaireGame.getDeck(board, toDeckName);
        if (fromDeck.length() > 0) {
            let cards = await fromDeck.draw()
            let card = cards[0];
            debug.log(`Drew ${card.rootElement.id} from ${fromDeckName}.`);
            if (toDeck.length() > 0) {
                toDeck.top().disableDragDrop();
                debug.log(`Disabled drag & drop for ${toDeck.top().rootElement.id}.`)
            }
            if (fromDeckName !== "stock" && fromDeck.length() > 0){
                let fromCard = fromDeck.top();
                if (!fromCard.isVisible()) {
                    fromCard.flipUp();
                    debug.log(`Flipped the top of ${fromDeckName} and it was ${fromCard.rootElement.id}.`);
                }
                fromCard.enableDragDrop();
                debug.log(`Enabled drag & drop for ${fromCard.rootElement.id}.`);
            }
            SolitaireBoard.setDeckData(card, toDeckName);
            toDeck.addToTop(card);
            debug.log(`Moved ${card.rootElement.id} to ${toDeckName}.`);
        }
    }

    static getDeck(board, deckName) {
        switch (deckName) {
            case "stock":
                return board.stock;
            case "talon":
                return board.talon;
            case "hearts":
                return board.foundations["hearts"];
            case "diamonds":
                return board.foundations["diamonds"];
            case "clubs":
                return board.foundations["clubs"];
            case "spades":
                return board.foundations["spades"];
            default:
                if (!deckName.toLowerCase().includes('tableau'))
                    return null;
                return board.tableauBoard.deckIndex[deckName.toLowerCase()];
        }
    }

    static getElement(board, elementName) {
        switch (elementName) {
            case "talon":
                return board.talonElement;
            case "hearts":
                return board.elementIndex["hearts"];
            case "diamonds":
                return board.elementIndex["diamonds"];
            case "clubs":
                return board.elementIndex["clubs"];
            case "spades":
                return board.elementIndex["spades"];
            default:
                if (!elementName.toLowerCase().includes('tableau'))
                    return null;
                return board.tableauBoard.elementIndex[elementName.toLowerCase()];
        }
    }
}


export {SolitaireGame}
