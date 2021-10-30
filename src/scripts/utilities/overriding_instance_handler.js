const InstanceHandler = {
    // Traps the '.' operator when grabbing a class's property/attribute
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
        console.debug(`InstanceHandler.has(${target.name}, ${key})`)
        if (key[0] === '_') {
            return false;
        }
        console.log(target.proxied);
        return key in target;
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        console.debug(`InstanceHandler.defineProperty(${target.name}, ${key}, ${descriptor})`)
        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property definition starting with '_'`);
        }
        invariant(key, 'define');
        return true;
    }
};


class MyClass {
    constructor(){
        this.notProxied = "original value";
        this.proxied = "original value";
        return new Proxy(this, InstanceHandler);
    }
}

//const proxy = new Proxy(target, handler);

var proxy = new MyClass();

console.log(proxy.notProxied); // "original value"
console.log(proxy.proxied);    // "replaced value"
proxy.proxied = 10;
console.log('proxied' in proxy);
//proxy._name = 11; // throws an error because I don't want a property starting with '_'

delete proxy;

module.exports = InstanceHandler