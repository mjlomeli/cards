const InstanceHandler = require('../src/scripts/utilities/overriding_instance_handler.js')
//import InstanceHandler from '../src/scripts/utilities/overriding_instance_handler.js'


function main(){
    class MyClass {
        constructor(){
            this.notProxied = "original value";
            this.proxied = "original value";
            return new Proxy(this, InstanceHandler)
        }
    }


    var proxy = new MyClass();

    console.log(proxy.notProxied); // "original value"
    console.log(proxy.proxied);    // "replaced value"
    proxy.proxied = 10;
    console.log('proxied' in proxy);
    delete proxy.proxied
    try {
        proxy._name = 11; // throws an error because I don't want a property starting with '_'
    } catch (e){
        console.log(`\x1b[31m${e}\x1b[0m`);
    }
}



if (typeof require !== 'undefined' && require.main === module) {
    let tags = process.argv.slice(2);
    if (!tags.includes('--debug'))
        console.debug = function(){};
    if (!tags.includes('--warn'))
        console.warn = function(){};
    main();
}