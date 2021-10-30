var StaticHandler = {
    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        console.debug(`StaticHandler.construct(${target.name}, ${args})`)

        // expected output: "monster1 constructor called"
        return new target(...args);
    },

    // traps the 'delete' operator
    deleteProperty(target, prop) {
        console.debug(`StaticHandler.deleteProperty(${target.name}, ${prop})`)
        if (prop in target) {
            delete target[prop];
            console.log(`property removed: ${prop}`);
            // expected output: "property removed: texture"
        }
    },

    get: function(target, prop, receiver) {
        console.debug(`InstanceHandler.get(${target.name}, ${prop}, ${typeof receiver})})`)
        if (prop === "proxied") {
            return "replaced value";
        }
        return Reflect.get(...arguments);
    },

    // traps the '.' operator when assigning a class's property/attribute
    set(obj, prop, value) {
        console.debug(`InstanceHandler.set(${obj.name}, ${prop}, ${value})`)
        if (prop === 'proxied') {
            console.log(`You just tried to set the value to ${value}`);
        } else {
            return Reflect.set(...arguments);
        }
    },

    // Traps the 'in' operator
    has(target, key) {
        console.debug(`StaticHandler.has(${target.name}, ${key})`)
        if (key[0] === '_') {
            return false;
        }
        console.log(target.proxied);
        return key in target;
    }
};

class __MyClass {
    constructor(){
        this.notProxied = "original value";
        this.proxied = "original value";
        return new Proxy(__MyClass, StaticHandler)
    }
}

var MyClass = new Proxy(__MyClass, StaticHandler);

var proxy = new MyClass();

console.log(proxy.notProxied); // "original value"
console.log(proxy.proxied);    // "replaced value"
proxy.proxied = 10;
console.log('proxied' in proxy);
proxy._name = 11; // throws an error because I don't want a property starting with '_'
delete proxy.proxied

module.exports = StaticHandler
