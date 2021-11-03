import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {SolitaireDeck} from "../scripts/solitaire_deck.mjs";


var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {

    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser()){
    main();
}
