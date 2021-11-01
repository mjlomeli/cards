import Example from "./scripts/example.mjs"
//let Canvas = require('./scripts/canvas.mjs');

// breaks at Deck, solitaire, and product and doesn't add the event listener
//let Deck = require('./scripts/deck.mjs');
//let SolitaireCard = require('./scripts/solitaire_card.mjs');
//let product = require('./scripts/utilities/cartesian_product');


let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
/*
let deck = new Deck();
let prod = product(repeat=1, values, suits);
for (let i = 0; i < prod.length; i++){
    let card = new SolitaireCard(prod[i][0], prod[i][1]);
    card.flip();
    deck.addToBottom(card);
    console.log(`\x1b[34m  ⤷ added to deck: ${card.repr()}\x1b[0m`);
}
*/

//let canvas = new Canvas(document);

document.addEventListener("DOMContentLoaded", () => {
    // This is the main for all HTML contenten to render
    console.log("hello world!")
    const main = document.getElementById("main");
    new Example(main);


    const div = document.createElement('div');
    div.textContent
    document.body.append(div)

});
