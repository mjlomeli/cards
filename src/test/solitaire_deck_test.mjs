import {SolitaireDeck} from "../scripts/solitaire_deck.mjs";
import {isBrowser, isNodeJs} from "../scripts/utilities/utilities.mjs";

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let button_td = document.getElementById('button');
        let cards_td = document.getElementById('cards');

        let count = 0;
        let label = document.createElement('label');
        label.textContent = "Counted: 0";
        let button = document.createElement('input');
        button.type = "button";
        button.value = "draw";
        button_td.appendChild(button);
        button_td.appendChild(label);

        let deck = new SolitaireDeck();
        button.addEventListener("click", async () => {
            if (deck.length() > 0) {
                deck.shuffle();
                let card = deck.draw()[0];
                await card.buildSolitaire();
                card.rootElement.style = "margin-top:30px";
                let td = document.createElement('td');
                td.appendChild(card.rootElement);
                cards_td.appendChild(td);
                label.textContent = `Counted: ${++count}`
            }
        });




        document.body.append(button);
    });
}

// Way of detecting if running off Node.js or Browser
if (isNodeJs() || isBrowser()){
    main();
}