

class Canvas {
    constructor(canvas_element) {
        this.canvas = canvas_element;
    }

    drawCard(card){

    }

    drawDeck(deck){

    }

    drawSquare(){
        var c = this.canvas.getContext('2d');
        c.fillStyle = "red";
        c.fillRect(100, 100, 400, 300);
    }
}



module.exports = Canvas;