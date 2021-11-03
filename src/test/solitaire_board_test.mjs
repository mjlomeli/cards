import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {SolitaireBoard} from "../scripts/solitaire_board.mjs";

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let board = new SolitaireBoard();
        await board.buildSolitaireBoard();

        document.body.appendChild(board.rootElement);
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}
