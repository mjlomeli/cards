import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {SolitaireGame} from "../scripts/solitaire_game.mjs";




var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        window.SolitaireGame = SolitaireGame
        window.game = new SolitaireGame();
        let game = window.game;
        await game.start();
        game.enableStockDrawOnClick();
        document.body.appendChild(game.rootElement);
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}
