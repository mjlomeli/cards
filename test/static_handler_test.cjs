//import StaticHandler from '../src/scripts/utilities/overriding_static_handler.js'
const StaticHandler = require('../src/scripts/utilities/overriding_static_handler.js')



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



if (typeof require !== 'undefined' && require.main === module) {
    // same as if __name__ === "__main__"
    main();
}