import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {dragElement} from "../scripts/utilities/document_utilities.js";
import {SolitaireCard} from "../scripts/solitaire_card.mjs";

function getSolitaireJson() {
    /*
        Must use keyword 'await' to use this.
        Ex:
            let deckIndex = await locateIndexJson();
     */
    let path = projectDirectory('cards') + '/src/themes/solitaire/index.json';
    if (isNodeJs()) {
        return openJson(path)
    } else if (isBrowser()) {
        // openJson returns a promise so await must be added to the caller.
        return openJson(path)
    }
    return {};
}

let solitaireJSON = null;

async function createCard(suit, rank){
    let cardElement = document.createElement('div');
    let checked = document.createElement('input');
    let frontDiv = document.createElement('div');
    let backDiv = document.createElement('div');
    let frontImageElement = document.createElement('img');
    let backImageElement = document.createElement('img');

    cardElement.setAttribute('class', 'card')
    cardElement.draggable = true;
    checked.setAttribute('type', 'checkbox');
    frontDiv.setAttribute('class', 'card-side front');
    backDiv.setAttribute('class', 'card-side back');

    cardElement.dataset.flipped = 'false';
    frontDiv.dataset.suit = suit;
    frontDiv.dataset.rank = rank;
    frontImageElement.setAttribute('alt', `${rank} of ${suit}`);
    if (solitaireJSON === null)
        solitaireJSON = await getSolitaireJson();
    frontImageElement.setAttribute('src', '../src/themes' + solitaireJSON[suit][rank]);
    frontDiv.appendChild(frontImageElement);

    backDiv.dataset.suit = 'hidden';
    backDiv.dataset.rank = 'hidden';
    backImageElement.setAttribute('alt', `hidden`);
    if (solitaireJSON === null)
        solitaireJSON = await getSolitaireJson();
    backImageElement.setAttribute('src', '../src/themes' + solitaireJSON['backside']);
    backDiv.appendChild(backImageElement);

    cardElement.appendChild(frontDiv);
    cardElement.appendChild(backDiv);



    let moved = false;

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    cardElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        moved = false;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        moved = true;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        cardElement.style.top = (cardElement.offsetTop - pos2) + "px";
        cardElement.style.left = (cardElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    backDiv.classList.toggle('flip');
    cardElement.addEventListener("click", () =>{
        // classList access the css, we use .flip (note: doesn't need to have the same class name)
        if (!moved) {
            backDiv.classList.toggle("flip");
            frontDiv.classList.toggle("flip");
        }
    });

    return cardElement;
}

document.addEventListener("DOMContentLoaded", async () => {
    let div = document.createElement('div');
    let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    let ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    let pair = product(1, suits, ranks);
    /*
    for (let i = 0; i < pair.length; i++) {
        let [suit, rank] = pair[i];
        let card = await createCard(suit, rank);
        div.appendChild(card);
        document.body.append(div)
    }
     */
    let card = await createCard('hearts', 'queen');
    //let card = await new SolitaireCard('hearts', 'queen');
    div.appendChild(card);
    document.body.append(div)
});