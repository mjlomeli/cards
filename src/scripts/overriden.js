class MyClass {
    constructor(){
        return new Proxy(this, handler);
    }
}

const target = {
    notProxied: "original value",
    proxied: "original value"
};

const handler = {
    // Traps the 'in' operator
    has(target, key) {
        console.debug(`has(${target}, ${key})`)
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    },

    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        console.log('monster1 constructor called');
        // expected output: "monster1 constructor called"

        return new target(...args);
    },

    // Traps the '.' operator when grabbing a class's property/attribute
    get: function(target, prop, receiver) {
        if (prop === "proxied") {
            return "replaced value";
        }
        return Reflect.get(...arguments);
    },

    // traps the '.' operator when assigning a class's property/attribute
    set(obj, prop, value) {
        if (prop === 'proxied') {
            console.log(`You just tried to set the value to ${value}`);
        } else {
            return Reflect.set(...arguments);
        }
    },

    // traps the 'delete' operator
    deleteProperty(target, prop) {
        if (prop in target) {
            delete target[prop];
            console.log(`property removed: ${prop}`);
            // expected output: "property removed: texture"
        }
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property definition starting with '_'`);
        }
        invariant(key, 'define');
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.notProxied); // "original value"
console.log(proxy.proxied);    // "replaced value"
proxy.proxied = 10;
console.log('proxied' in proxy);
proxy._name = 11; // throws an error because I don't want a property starting with '_'

