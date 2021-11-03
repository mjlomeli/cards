import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {Board} from "../scripts/board.mjs";


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
        });
        document.body.appendChild(board.rootElement);
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}
