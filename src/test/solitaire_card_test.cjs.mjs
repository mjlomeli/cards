import {SolitaireCard} from "../scripts/solitaire_card.mjs";
import {isBrowser, isNodeJs} from "../scripts/utilities/utilities.mjs";

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let div = document.createElement('div');
        let card = new SolitaireCard('hearts', 'queen');
        await card.build();
        card.enableDragOnMouseClickHold()
        card.enableFlippingOnClick();
        div.appendChild(card.cardElement);
        document.body.append(div)
    });
}

// Way of detecting if running off Node.js or Browser
if (isNodeJs() || isBrowser()){
    main();
}