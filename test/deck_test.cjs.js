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
    console.log(`\x1b[1;36m${'Testing Deck'}\x1b[0m`);
    let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
    let symbols = ['♥', '♠', '♦', '♣']
    let deck = new Deck();
    let prod = product(repeat=1, values, suits);
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


if (typeof require !== 'undefined' && require.main === module) {
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}