import {isBrowser, isNodeJs} from "../scripts/utilities/utilities.mjs";
import {Card} from "../scripts/card.mjs"

let mainNodeJs = function(){}

let mainBrowser = function(){

    document.addEventListener("DOMContentLoaded", async () => {
        let front = 'src/themes/solitaire/diamonds/2_of_diamonds.svg';
        let back = 'src/themes/solitaire/backside.svg'
        let card = new Card(front, back);
        card.buildCard();
        card.enableFlippingOnClick();
        card.enableDragOnMouseClickHold();
        document.body.appendChild(card.rootElement);
    });
}


// Way of detecting if running off Node.js
if (isNodeJs()){
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    mainNodeJs();
} else if (isBrowser()){
    mainBrowser();
}

