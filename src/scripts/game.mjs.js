class GameMjs {
    constructor(){


    }
}


export default GameMjs


var main = function(){
    // code to run
    var game = new GameMjs();
}

if (typeof require !== 'undefined' && require.main === module) {
    // same as if __name__ === "__main__"
    main();
}