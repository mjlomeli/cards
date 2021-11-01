import StaticHandler from "../scripts/utilities/overriding_static_handler.mjs"

function main(){
    class __MyClass {
        constructor(notProxied="original value", proxied="original value"){
            this.notProxied = notProxied;
            this.proxied = proxied;
        }
    }
    const MyClass = new Proxy(__MyClass, StaticHandler);

    var proxy = new MyClass("original value", "original value");
}



// Way of detecting if running off Node.js
if ((typeof process !== 'undefined') && (process.release.name === 'node') ||
    // Node (>= 3.0.0) or io.js
    ((typeof process !== 'undefined') && (process.release.name.search(/node|io.js/) !== -1)) ||
    // Node (>= 0.10.0) or io.js
    ((typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined'))) {

    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}
// Runs if the HTML window isn't given
else if (typeof window === 'undefined') {}