import {Deck} from "../scripts/deck.mjs"
import {SolitaireCard} from "../scripts/solitaire_card.mjs";
import {isNodeJs, product} from "../scripts/utilities/utilities.mjs";

function main(){
    console.log(`\x1b[1;36m${'Testing Deck'}\x1b[0m`);
    let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
    let symbols = ['♥', '♠', '♦', '♣']
    let deck = new Deck();
    let prod = product(1, values, suits);
    for (let i = 0; i < prod.length; i++){
        let card = new SolitaireCard(prod[i][0], prod[i][1]);
        card.flip();
        deck.addToBottom(card);
        console.log(`\x1b[34m  ⤷ added to deck: ${card.repr()}\x1b[0m`);
    }
    console.log(`${deck}`);

    console.log("\n\n\n");
    console.log(`\x1b[1;36m${'Testing Shuffle'}\x1b[0m`);
    deck.shuffle();
    console.log(`${deck}`);

    console.log("\n\n\n");
    console.log(`\x1b[1;36m${'Testing Draw Cards'}\x1b[0m`);
    let cards = deck.draw(5);
    console.log("Drawn Cards:")
    cards.forEach(card =>{
        console.log(`\t${card}`);
    });
    console.log(`${deck}`);

    console.log("\n\n\n");
    console.log(`\x1b[1;36m${'Testing Add Random'}\x1b[0m`);
    cards.forEach(card => {
        console.log(`Adding Random: ${card}`);
        deck.addToRandom(card);
    });
    console.log(`${deck}`);

    console.log("\n\n\n");
    console.log(`\x1b[1;36m${'Testing Draw Where'}\x1b[0m`);
    let hearts = deck.drawWhere(card => card.suit === 'Hearts');
    let spades = deck.drawWhere(card => card.suit === 'Spades');
    let diamonds = deck.drawWhere(card => card.suit === 'Diamonds');
    let clubs = deck.drawWhere(card => card.suit === 'Clubs');
    console.log(`${hearts}`);
    console.log(`${spades}`);
    console.log(`${diamonds}`);
    console.log(`${clubs}`);
    console.log(`${deck}`);
}


if (isNodeJs()){
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}