import {isNode} from "../scripts/utilities/utilities.mjs";
import {Card} from "../scripts/card.mjs"

var main = function(){
    // code to run
    console.log(`\x1b[1;36m${'Testing Card'}\x1b[0m`);

    console.log(`\x1b[1;34m${'new Card("queen", "hearts")'}\x1b[0m`);
    let card = new Card('queen of hearts');
    let other_card = new Card('king of spades');
    console.log(`\x1b[34m  ⤷ repr: ${card.repr()}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ toString: ${card}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ equals (same): ${card.equals(card)}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ equals (different): ${card.equals(other_card)}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ 'queen' in card: ${'queen' in card}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ 'queen of hearts' in card: ${'queen of hearts' in card}\x1b[0m`);
}


// Way of detecting if running off Node.js
if (isNode()){
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}


