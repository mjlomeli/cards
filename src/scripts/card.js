class Card {
    static backImgUrl = null;
    constructor(){
        this.frontImgUrl = null;
        this.name = null;
        this.data = {};
    }

    toString(){
        return `<Card(${this.name})>`;
    }
    /* Overriding function
        "<, >, ===" : valueOf
        "="         : assign
        keys()
        hasOwn()
        values()
        is()

        Proxy Overriding (good stuff)
        has()  // The handler.has() method is a trap for the in operator. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has
        set() // handles the property assignments (e.g. Object.name = "name")
        get() // handles the property getting (e.g. Object.name)

     */
}


export default Card


var main = function(){
    // code to run
    var card = Card();
}

if (typeof require !== 'undefined' && require.main === module) {
    // same as if __name__ === "__main__"
    main();
}