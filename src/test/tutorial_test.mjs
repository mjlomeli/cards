import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {SolitaireGame} from "../scripts/solitaire_game.mjs";
import {introduction, quotes} from "../scripts/tutorial.mjs";


var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let game = null; // fully created
        document.body.appendChild(introduction(game));
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}
