const SolitaireClass = require('../src/scripts/solitaire_card.mjs')
let SolitaireCard = SolitaireClass.SolitaireCard;

var main = function(){
    // code to run
    console.log(`\x1b[1;36m${'Testing SolitaireCard'}\x1b[0m`);

    console.log(`\x1b[1;34m${'new SolitaireCard("queen", "hearts")'}\x1b[0m`);
    let queen_hearts = new SolitaireCard('queen', 'hearts', null);
    let king_hearts = new SolitaireCard('king', 'hearts', null);
    let ace_spades = new SolitaireCard('ace', 'spades', null);
    let eight_diamonds = new SolitaireCard(8, 'diamonds', null);
    console.log(`\x1b[34m  ⤷ repr: ${queen_hearts.repr()}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ toString: ${queen_hearts}\x1b[0m`);
    queen_hearts.flip();
    console.log(`\x1b[34m  ⤷ flip: ${queen_hearts}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ 'queen' in card: ${'queen' in queen_hearts}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ 'hearts' in card: ${'hearts' in queen_hearts}\x1b[0m`);

    console.log(`\x1b[34m  ⤷ QueenHearts.lessThan(KingHearts): ${queen_hearts.lessThan(king_hearts)}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ QueenHearts.greaterThan(KingHearts): ${queen_hearts.greaterThan(king_hearts)}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ QueenHearts.equals(QueenHearts): ${queen_hearts.equals(queen_hearts)}\x1b[0m`);
    console.log(`\x1b[34m  ⤷ AceSpades.lessThan(QueenHearts): ${ace_spades.lessThan(queen_hearts)}\x1b[0m`);

}

if (typeof require !== 'undefined' && require.main === module) {
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}