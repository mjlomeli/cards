import {SolitaireCard} from "../scripts/solitaire_card.mjs";
import {isBrowser, isNodeJs} from "../scripts/utilities/utilities.mjs";

function dragStart(event) {
    console.log("started to drag the element")
    console.log(`event.target.id = ${event.target.id}`);
    console.log(`event.currentTarget.id = ${event.currentTarget.id}`);
    event.dataTransfer.setData("Text", event.currentTarget.id);
}

function dragEnd(event) {
    console.log("finished dragging the element")
}

function givesDrop(event) {
    console.log("Started givesDrop")
    event.preventDefault();
}


function getsDrop(event) {
    event.preventDefault();
    console.log("Started getsDrop")
    console.log(`event.target.id = ${event.target.id}`);
    console.log(`event.currentTarget.id = ${event.currentTarget.id}`);
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
}

var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        let right = document.getElementById("right");
        let left = document.getElementById("left")

        let card = new SolitaireCard('hearts', 'queen');
        await card.build()
        card.enableDragDrop(right, left);

        right.appendChild(card.cardElement);
    });
}

// Way of detecting if running off Node.js or Browser
if (isNodeJs() || isBrowser()){
    main();
}