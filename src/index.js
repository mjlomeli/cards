// TODO:

import ExampleMjs from "./scripts/example.mjs.js"
import Card from "./scripts/card.mjs.js";


var main = function(){
    document.addEventListener("DOMContentLoaded", () => {

        console.log("hello world!")
        const main = document.getElementById("main");
        new ExampleMjs(main);
    });
}

if (typeof require !== 'undefined' && require.main === module) {
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    main();
}