import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {Board} from "../scripts/board.mjs";
import {Card} from "../scripts/card.mjs";

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let board = new Board('stock talon hearts clubs diamonds spades',
        'tableu tableu tableu tableu tableu tableu');
        board.buildBoard();
        board.areas.forEach(area => {
            let header = document.createElement('h3');
            header.textContent = area;
            board.index[area].appendChild(header);
            board.enableDrop(area);
        });
        board.index['stock'].getElementsByTagName('h3')[0].remove();
        board.disableDrop('stock');

        let front = 'src/themes/solitaire/empty.svg';
        let back = 'src/themes/solitaire/empty.svg'
        let card = new Card(front, back);
        card.buildCard();
        // need to add the id of the card
        card.rootElement.id = "empty";
        card.enableDragDrop();

        board.index['stock'].appendChild(card.rootElement);
        document.body.appendChild(board.rootElement);
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}
