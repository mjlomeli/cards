import {SolitaireBoard} from "./solitaire_board.mjs";
import {SolitaireCard} from "./solitaire_card.mjs";

class SolitaireGame {
    constructor(){
        this.board = null;
        this.rootElement = null;

        this.onStockClick = null;
    }

    async start(){
        this.board = new SolitaireBoard();
        await this.board.buildSolitaireBoard()
        this.rootElement = this.board.rootElement;
    }

    async draw() {
        if (this.board.stock.length() === 1) {
            let stock = this.board.stockCard;
            stock.rootElement.remove();
            stock.frontImageUrl = SolitaireBoard.solitaireJSON['empty'];
            stock.backImageUrl = SolitaireBoard.solitaireJSON['empty'];
            stock.buildCard();
            this.board.index['stock'].appendChild(stock.rootElement);
        }
        if (this.board.stock.length() > 0) {
            let cards = await this.board.stock.draw();
            let card = cards[0];
            card.enableDragDrop()
            card.enableDragOnMouseClickHold();
            if (this.board.talon.length() > 0){
                let nextCard = this.board.talon.top();
                nextCard.disableDragDrop();
                nextCard.disableDragOnMouseClickHold();
            }
            this.board.talon.addToTop(card);
            this.board.board.index['talon'].appendChild(card.rootElement);
        }
    }

    enableStockDrawOnClick() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        //save the bounded function to be able to remove the event listener later.
        this.onStockClick = this.draw.bind(this);
        this.board.stockElement.addEventListener("click", this.onStockClick);
    }

    disableStockDrawOnClick() {
        this.board.stockElement.removeEventListener("click", this.onStockClick)
    }


}


export {SolitaireGame}
