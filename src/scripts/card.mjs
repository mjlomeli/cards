
const StaticHandler = {
    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        let str_args = args.map(value => JSON.stringify(value)).join("\x1b[36m, \x1b[0m")
        console.debug(`\x1b[36mnew ${target.name.replace("__", "")}(\x1b[0m${str_args}\x1b[36m)\x1b[0m`);
        function invariant(args, action) {
            // raise an error if invalid arguments
            let err_args = args.map(value => JSON.stringify(value)).join(", ")
            if (args.length === 0 || args.length > 3)
                throw new Error(`\x1b[31mInvalid arguments: Card(${err_args})\x1b[0m`);
        }
        //invariant(args, 'arguments');
        
        return new target(...args);
    }
};

const InstanceHandler = {
    // traps the 'delete' operator
    deleteProperty(target, prop) {
        console.debug(`\x1b[36m${target.constructor.name}.deleteProperty(\x1b[0m${prop}\x1b[36m)\x1b[0m`);
        if (prop in target) {
            delete target[prop];
            console.debug(`\x1b[36m  ⤷ Deleted property: \x1b[32m${prop}\x1b[0m`);
        }
    },

    get: function (target, prop, receiver) {
        let str_prop = prop.toString()
        console.debug(`\x1b[36m${target.constructor.name}.get(\x1b[0m${str_prop}\x1b[36m)\x1b[0m`);
        let gotten = Reflect.get(...arguments);
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(gotten)}\x1b[0m`);
        return gotten
    },

    // traps the '.' operator when assigning a class's property/attribute
    set(obj, prop, value) {
        let str_val = JSON.stringify(value);
        let str_prop = JSON.stringify(prop)
        console.debug(`\x1b[36m${obj.constructor.name}.\x1b[0m${str_prop}\x1b[36m = \x1b[0m${str_val}\x1b[36m;\x1b[0m`);
        let set_result = Reflect.set(...arguments);
        console.debug(`\x1b[36m  ⤷ ${prop} set to: \x1b[32m${str_val}\x1b[0m`);
        return set_result;
    },

    // Traps the 'in' operator
    has(target, key) {
        console.debug(`\x1b[0m${JSON.stringify(key)}\x1b[36m in \x1b[0m${target.constructor.name}\x1b[0m`);
        let found = key in target;
        let nameFound = key === target.name;
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(found)}\x1b[0m`);
        return found || nameFound;
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        let val = JSON.stringify(descriptor);
        console.debug(`\x1b[36m  ⤷ Defining: ${target.constructor.name}\x1b[36m.\x1b[0m${key}\x1b[36m = \x1b[0m${val}`);

        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property ${action} starting with '_'`);
        }

        // example
        //invariant(key, 'definition');
        return Reflect.defineProperty(...arguments);
    }
};


class __Card {
    constructor(name, frontImageUrl=null){
        this.name = name;
        this.frontImageUrl = frontImageUrl;
        return new Proxy(this, InstanceHandler);
    }

    contains(other){
        if (other instanceof Card)
            return this.equals(other);
        else {
            for (const property in this) {
                if (this[property] === other)
                    return true;
            }
        }
        return false;
    }

    toString(){
        return `<Card(${JSON.stringify(this.name)})>`;
    }

    repr(){
        let name = JSON.stringify(this.name);
        let frontImageUrl = JSON.stringify(this.frontImageUrl);
        return `<Card(name=${name}, frontImageUrl=${frontImageUrl})>`;
    }

    equals(other){
        if (typeof other !== typeof this)
            return false;
        for (const property in this){
            if (other[property] !== this[property])
                return false;
        }
        return true;
    }
}


let Card = new Proxy(__Card, StaticHandler);

export { Card, __Card }