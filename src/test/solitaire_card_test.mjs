import {SolitaireCard} from "../scripts/solitaire_card.mjs";
import {isBrowser, isNodeJs} from "../scripts/utilities/utilities.mjs";

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let div = document.createElement('div');
        let card = new SolitaireCard('hearts', 'queen');
        await card.buildSolitaire();
        card.enableDragOnMouseClickHold()
        card.enableFlippingOnClick();
        div.appendChild(card.rootElement);

        let div2 = document.createElement('div');
        let card2 = new SolitaireCard('hearts', 'queen');
        await card2.buildSolitaire();
        card2.enableDragOnMouseClickHold()
        card2.enableFlippingOnClick();
        div2.appendChild(card2.rootElement);
        document.body.append(div)
        document.body.append(div2)

        let one_enabled = true;
        let button_one = document.createElement('input');
        button_one.setAttribute("type", "button");
        button_one.setAttribute("value", "halt card 1");
        button_one.addEventListener("click", ()=>{
            if (one_enabled) {
                card.disableDragOnMouseClickHold();
                card.disableFlippingOnClick();
            } else {
                card.enableDragOnMouseClickHold();
                card.enableFlippingOnClick();
            }
            one_enabled = !one_enabled;
        });

        let two_enabled = true;
        let button_two = document.createElement('input');
        button_two.setAttribute("type", "button");
        button_two.setAttribute("value", "halt card 2");
        button_two.addEventListener("click", ()=>{
            if (two_enabled) {
                card2.disableDragOnMouseClickHold();
                card2.disableFlippingOnClick();
            } else {
                card2.enableDragOnMouseClickHold();
                card2.enableFlippingOnClick();
            }
            two_enabled = !two_enabled;
        });

        document.body.append(button_one);
        document.body.append(button_two);
    });
}

// Way of detecting if running off Node.js or Browser
if (isNodeJs() || isBrowser()){
    main();
}