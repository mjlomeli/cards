/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */

class Board {
    constructor(rows, columns){
        this.tableauSize = 7;
        this.foundationSize = 4;
        this.tableau = Array.from(Array(this.tableauSize), () => Array(3).fill(0));
        this.foundations = Array.from(Array(this.foundationSize), () => Array(3).fill(0));
        this.stock = []; // the face down deck
        this.talon = []; // drawn the face up cards
    }

    async build(){
    }

    getElement(row, column){
        return this.grid[row][column]
    }

    pushElement(row, column, element){
    }
}


export default Board