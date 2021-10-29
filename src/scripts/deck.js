class Card {
    constructor(){

    }
}

class Deck {
    // Credit goes to Kadamwhite for providing the starter skeleton: https://www.npmjs.com/package/card-deck
    constructor(){
        this.length = 0;

    }
}

Deck.prototype.shuffle = function(){

}


Deck.prototype.top = function(num=1){

}


Deck.prototype.bottom = function(num=1){

}


Deck.prototype.remaining = function(){

}


Deck.prototype.draw = function(num=1){

}


Deck.prototype.drawFromBottom = function(num=1){

}


Deck.prototype.addToTop = function(){

}


Deck.prototype.addToBottom = function(){

}


Deck.prototype.addRandom = function(...cards){

}


Deck.prototype.drawWhere = function(callback, num=1){

}


Deck.prototype.drawRandom = function(num){

}


Deck.prototype.toString = function(){
    return `<Deck(${9})>`
}


