import InstanceHandler from "../scripts/utilities/overriding_instance_handler.mjs";

function main(){
    class MyClass {
        constructor(){
            this.notProxied = "original value";
            this.proxied = "original value";
            return new Proxy(this, InstanceHandler)
        }
    }


    var proxy = new MyClass();

    console.log(`Getting 'proxied' property:`);
    console.log(`'proxied' property returned: ${proxy.proxied}\n`);

    console.log(`Setting 'proxied' property:`);
    proxy.proxied = 10;
    console.log(`'proxied' was set to: ${10} \n`);

    console.log(`'proxied' in proxy:`);
    console.log(`'proxied' in proxy returned: ${'proxied' in proxy}\n`);

    console.log(`\nDeleting proxy:`);
    delete proxy.proxied
    console.log(`Deleted proxy.\n`);

    try {
        console.log(`Defining property and catching error:`);
        proxy._name = 11; // throws an error because I don't want a property starting with '_'
    } catch (e){
        console.log(`\x1b[31m${e}\x1b[0m`);
        console.log(`Defining property caught the error.`);
    }
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