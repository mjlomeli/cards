import {SolitaireBoard} from "./solitaire_board.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";
import {Card} from "./card.mjs";
import {debug} from "./utilities/utilities.mjs";
import {introduction, popupIntroBox} from "./tutorial.mjs";


class SolitaireGame {
    static dropReceivers = {}

    constructor() {
        this.board = null;
        this.rootElement = null;

        this.onStockClick = null;
    }

    async start(difficulty) {
        this.board = new SolitaireBoard(difficulty);
        await this.board.buildSolitaireBoard()
        this.rootElement = this.board.rootElement;

        for (let area of this.board.tableauBoard.areas) {
            let tableauElement = this.board.tableauBoard.elementIndex[area];
            let tableauDeck = this.board.tableauBoard.deckIndex[area];
            await SolitaireGame.enableGetsDrop(area, tableauElement, this);
            if (tableauDeck.length() > 0) {
                let card = tableauDeck.top();
                card.enableDragDrop();
                card.rootElement.classList.add('cursor-grab');
                card.rootElement.ondragover = SolitaireGame.onDragOver.bind(this, card);
            }
        }

        for (let foundationName in this.board.foundationCardIndex){
            let rootGridElement = this.board.board.elementIndex[foundationName];
            SolitaireGame.enableGetsDrop(foundationName, rootGridElement, this);
        }

    }

    async draw() {
        debug.func("draw", "started");
        if (this.board.stock.length() === 1) {
            this.board.stockCard.flipUp();
            this.disableStockDrawOnClick();
            debug.log("last card drew");
        }
        if (this.board.stock.length() > 0) {
            await SolitaireGame.drawFromDeckTo(this.board, "stock", "talon");
            let card = this.board.talon.top();
            this.board.cardIndex[card.id] = card;
            this.board.board.elementIndex["talon"].appendChild(card.rootElement);
            card.enableDragDrop();
            card.rootElement.ondragover = SolitaireGame.onDragOver.bind(this, card);
            Card.sound.play();
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
        this.board.stockElement.classList.add("cursor-grab");
        this.board.stockElement.classList.remove('cursor-default');
        debug.func("enableStockDrawOnClick", "finished")
    }

    disableStockDrawOnClick() {
        debug.event("disableStockDrawOnClick", "started");
        this.board.stockElement.removeEventListener("click", this.onStockClick)
        this.board.stockElement.classList.remove('cursor-grab');
        this.board.stockElement.classList.add('cursor-default');
        debug.log(`${this.board.stockElement.id} style='cursor-default'`);
        debug.event("disableStockDrawOnClick", "finished");
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
        debug.event("getsDrop", "started");
        event.preventDefault();

        let currentTargetId = event.currentTarget.id;
        let targetId = event.target.id;
        let data = event.dataTransfer.getData("Text");

        debug.log(`${currentTargetId} is getting ${data}`);

        if (this !== undefined && this.isValidMove(currentTargetId, data)) {
            debug.condition("if", "this !== undefined");
            let element = document.getElementById(data)
            let fromDeck = element.dataset.deck
            await SolitaireGame.drawFromDeckTo(this.board, fromDeck, currentTargetId);
            event.currentTarget.appendChild(element);
            onGameOver(this);
        }

        debug.event("getsDrop", "ended");
    }

    isValidMove(deckName, cardId){
        return this.isValidFoundationMove(deckName, cardId) ||
            this.isValidTableauMove(deckName, cardId)
    }

    isValidFoundationMove(deckName, cardId){
        if (!this.board.foundations.includes(deckName))
            return false;
        let card = this.board.cardIndex[cardId];
        let deck = this.board.foundationDeckIndex[deckName];
        if (!card.fitsFoundationOrder(deck))
            return false;
        card.disableDragDrop();
        card.rootElement.classList.remove('card-slide');
        return true;
    }

    isValidTableauMove(deckName, cardId){
        if (!deckName.includes('tableau'))
            return false;
        let card = this.board.cardIndex[cardId];
        let deck = this.board.tableauBoard.deckIndex[deckName];
        if (!card.fitsTableauOrder(deck))
            return false;
        card.rootElement.classList.add('card-slide');
        return true;
    }

    static onDragOver(heldCard, event){
        debug.event('onDragOver', 'started');
        let currentTargetId = event.currentTarget.id;
        debug.log(`Hovering over ${currentTargetId}`);
        let bottomCard = document.getElementById(currentTargetId);


        debug.event('onDragOver', 'ended')
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
                return board.foundationDeckIndex["hearts"];
            case "diamonds":
                return board.foundationDeckIndex["diamonds"];
            case "clubs":
                return board.foundationDeckIndex["clubs"];
            case "spades":
                return board.foundationDeckIndex["spades"];
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


function onGameOver(game){
    function isGameOver(game){
        return game.board.foundations.every(suit => {
            return game.board.foundationDeckIndex[suit].length() === 13
        });
    }

    if (isGameOver(game)){
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.textContent = "Congratulations!"
        div.appendChild(h1);
        let p1 = document.createElement('p');
        p1.textContent = "The way of progress is constantly extreme and the individuals" +
            " who are constantly prepared to take challenges and have the bravery to " +
            "prevail upon it, just they are granted for these accomplishments."
        div.appendChild(p1);
        let p2 = document.createElement('p');
        p2.textContent = "I praise you as you have such an identity."
        div.appendChild(p2);
        let p3 = document.createElement('p');
        p3.textContent = "Continuously push forward throughout everyday life."
        div.appendChild(p3);
        let h2 = document.createElement('h2');
        h2.textContent = "Now, lets go harder..."
        div.appendChild(h2);
        let button = document.createElement('button');
        button.textContent = "Hold on tight!"
        div.appendChild(button)

        let box = popupIntroBox(div)

        async function hardGame(box, e) {
            console.log(box, e);
            game.rootElement.remove();
            game = new SolitaireGame();
            window.game = game; // for debugging
            await game.start('hard');
            game.enableStockDrawOnClick();
            box.remove();
            document.body.appendChild(game.rootElement);
        }

        let boundedFunc = hardGame.bind(this, box);
        button.addEventListener('click', boundedFunc);
        document.body.appendChild(box);
    }
}

export {SolitaireGame}
