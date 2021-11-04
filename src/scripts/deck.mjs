class Deck {
    // Credit goes to Kadamwhite for providing the starter skeleton: https://www.npmjs.com/package/card-deck
    constructor(){
        this.cards = [];
    }

    length(){
        return this.cards.length;
    }

    repr(){
        return `<Deck(length=${this.cards.length}, cards=[...])>`;
    }

    push(card){
        this.cards.push(card)
    }

    toString(){
        let s = `<Deck(length=${this.cards.length}, cards=[`
        this.cards.forEach((card, index) =>{
            if (index % 13 === 0)
                s += "\n\t";
            s += ` ${card} `;
        });
        s += "]>";
        return s;
    }

    contains(card) {
        for (let i = 0; i < this.cards; i++)
            if (typeof card == 'string' || card instanceof String && card in this.cards[i])
                return true;
            else if (this.cards[i] === card)
                return true;
        return false;
    }

    shuffle(entropy=null){
        //Durstenfeld Shuffle: https://bost.ocks.org/mike/shuffle/
        let i = (entropy === null) ? this.cards.length : entropy;
        let random_i;
        while (i !== 0) {
            random_i = Math.floor(Math.random() * i--);
            [this.cards[i], this.cards[random_i]] = [this.cards[random_i], this.cards[i]];
        }
    }

    top(){
        return this.cards[0];
    }

    bottom(){
        return this.cards[this.cards.length - 1];
    }

    remaining(){
        return this.cards.length;
    }

    draw(num=1){
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")
        return this.cards.splice(0, num);
    }

    drawFromBottom(){
        if (this.cards.length === 0)
            throw new Error("Can't draw from an empty deck.")
        return this.cards.pop();
    }

    addToTop(card){
        this.cards.unshift(card);
    }

    addToBottom(card){
        this.cards.push(card);
    }

    addToRandom(card){
        let index = Math.floor(Math.random() * this.cards.length);
        this.cards.splice(index, 0, card);
    }

    drawWhere(num=1, callback){
        let drawn_cards = [];
        let i = 0;
        while (num > 0 && i < this.cards.length){
            if (callback(this.cards[i])){
                drawn_cards = drawn_cards.concat(this.cards.splice(i, 1));
                num--;
            }
            else {
                i++;
            }
        }
        return drawn_cards;
    }

    drawRandom(num=1){
        let index = Math.floor(Math.random() * this.cards.length)
        let number = (this.cards.length > num) ? num : this.cards.length;
        this.cards.splice(index, number);
    }
}

export { Deck }