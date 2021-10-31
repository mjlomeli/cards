const DeckClass = require('../src/scripts/deck.mjs.js')
const SolitaireClass = require('../src/scripts/solitaire_card.mjs')

let Deck = DeckClass.Deck;
let SolitaireCard = SolitaireClass.SolitaireCard;

Array.prototype.multiply = function(number){
    if (!Number.isInteger(Number(number)))
        throw new Error(`Array.multiply only takes a whole number, not ${number}`);
    number = Number(number);
    let arr = [];
    while (number-- > 0)
        arr = arr.concat(this);
    return arr;
}

function product(repeat = 1, ...args) {
    // Cartesian Product: https://docs.python.org/3/library/itertools.html#itertools.product
    let pools = args.map(pool => JSON.stringify(pool)).multiply(repeat);
    let result = [[]];
    for (let pool_i = 0; pool_i < pools.length; pool_i++){
        let arr = [];
        let pool = JSON.parse(pools[pool_i]);
        for (let y_i = 0; y_i < pool.length; y_i++){
            for (let x_i = 0; x_i < result.length; x_i++){
                arr.push(result[x_i].concat(pool[y_i]));
            }
        }
        result = arr;
    }
    return result;
}

function main(){
    let values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
    let deck = new Deck();
    let prod = product(repeat=1, values, suits);
    for (let i = 0; i < prod.length; i++){
        let card = new SolitaireCard(prod[i][0], prod[i][1]);
        deck.addToBottom(card);
        console.log(`\x1b[34m  ⤷ added to deck: ${card.repr()}\x1b[0m`);
    }
}


if (typeof require !== 'undefined' && require.main === module) {
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}