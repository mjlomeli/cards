import InstanceHandler from "./utilities/overriding_instance_handler.js";
import StaticHandler from "./utilities/overriding_static_handler.js";

const CardStaticHandler = {
    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        var str_args = args.map(value => JSON.stringify(value)).join("\x1b[36m, \x1b[0m")
        console.debug(`\x1b[36mnew ${target.name.replace("__", "")}(\x1b[0m${str_args}\x1b[36m)\x1b[0m`);
        return new target(...args);
    }
};

const CardInstanceHandler = {
    // traps the 'delete' operator
    deleteProperty(target, prop) {
        console.debug(`\x1b[36mdeleteProperty(\x1b[0m${target.constructor.name}\x1b[36m, \x1b[0m${prop}\x1b[36m)\x1b[0m`);
        if (prop in target) {
            delete target[prop];
            console.log(`\x1b[32mproperty removed: ${prop}\x1b[0m`);
            // expected output: "property removed: texture"
        }
    },

    get: function(target, prop, receiver) {
        console.debug(`\x1b[36mStaticHandler.get(\x1b[0m${target.constructor.name}\x1b[36m, \x1b[0m${prop}\x1b[36m, \x1b[0m${typeof receiver}\x1b[36m)\x1b[0m`);
        if (prop === "proxied") {
            return "replaced value";
        }
        return Reflect.get(...arguments);
    },

    // traps the '.' operator when assigning a class's property/attribute
    set(obj, prop, value) {
        console.debug(`\x1b[36mStaticHandler.set(\x1b[0m${obj.constructor.name}\x1b[36m, \x1b[0m${prop}\x1b[36m, \x1b[0m${value}\x1b[36m)\x1b[0m`);
        if (prop === 'proxied') {
            console.log(`You just tried to set the value to ${value}`);
        } else {
            return Reflect.set(...arguments);
        }
    },

    // Traps the 'in' operator
    has(target, key) {
        console.debug(`\x1b[36mStaticHandler.has(\x1b[0m${target.constructor.name}\x1b[36m, \x1b[0m${key}\x1b[36m)\x1b[0m`);
        if (key[0] === '_') {
            return false;
        }
        console.log(target.proxied);
        return key in target;
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        console.debug(`\x1b[36mStaticHandler.defineProperty(\x1b[0m${target.name}\x1b[36m, \x1b[0m${key}\x1b[36m, \x1b[0m${descriptor}\x1b[36m)\x1b[0m`);
        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property definition starting with '_'`);
        }
        invariant(key, 'define');
        return true;
    }
};



class Card {
    static backImgUrl = null;
    constructor(){
        this.frontImgUrl = null;
        this.name = null;
        this.data = {};
    }

    toString(){
        return `<Card(${this.name})>`;
    }
}


//export default Card


var main = function(){
    // code to run
    var card = Card();
}

if (typeof require !== 'undefined' && require.main === module) {
    // same as if __name__ === "__main__"
    main();
}