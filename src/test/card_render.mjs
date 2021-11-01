import {isNodeJs, isBrowser, projectDirectory, openJson, product} from "../scripts/utilities/utilities.mjs";
import {dragElement} from "../scripts/utilities/document_utilities.js";

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
    let frontDiv = document.createElement('div');
    let backDiv = document.createElement('div');
    let frontImageElement = document.createElement('img');
    let backImageElement = document.createElement('img');

    cardElement.setAttribute('class', 'card')
    cardElement.draggable = true;
    frontDiv.setAttribute('class', 'card-side front');
    backDiv.setAttribute('class', 'card-side back');

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
    dragElement(card);
    div.appendChild(card);
    document.body.append(div)
});