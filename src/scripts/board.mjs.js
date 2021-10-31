class Game {
    constructor(){


    }
}


export default Game


var main = function(){
    // code to run
    var game = new Game();
}

if (typeof require !== 'undefined' && require.main === module) {
    // same as if __name__ === "__main__"
    main();
}