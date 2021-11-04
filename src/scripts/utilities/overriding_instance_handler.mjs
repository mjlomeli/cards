/*
    These are tools which help with debugging. They are not used in production.
 */

const InstanceHandler = {
    // traps the 'delete' operator
    deleteProperty(target, prop) {
        console.debug(`\x1b[36m${target.constructor.name}.deleteProperty(\x1b[0m${prop}\x1b[36m)\x1b[0m`);
        let delReturn = Reflect.deleteProperty(...arguments)
        if (delReturn) {
            console.debug(`\x1b[36m  ⤷ Deleted property: \x1b[32m${prop}\x1b[0m`);
        }
        return delReturn;
    },

    get: function(target, prop, receiver) {
        let str_prop = JSON.stringify(prop)
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
        if (set_result) {
            console.debug(`\x1b[36m  ⤷ ${prop} set to: \x1b[32m${str_val}\x1b[0m`);
        } else {
            console.debug(`\x1b[31mFailed to set ${obj.constructor.name}.${str_prop} = ${str_val}\x1b[0m`);
        }
        return set_result;
    },

    // Traps the 'in' operator
    has(target, key) {
        console.debug(`\x1b[0m${JSON.stringify(key)}\x1b[36m in \x1b[0m${target.constructor.name}\x1b[0m`);
        let found = Reflect.has(...arguments);
        console.debug(`\x1b[36m  ⤷ returned: \x1b[32m${JSON.stringify(found)}\x1b[0m`);
        return found
    },

    // traps the defineProperty which runs before creating a new property
    defineProperty(target, key, descriptor) {
        let val = JSON.stringify(descriptor);
        console.debug(`\x1b[36m  ⤷ Defining: ${target.constructor.name}\x1b[36m.\x1b[0m${key}\x1b[36m = \x1b[0m${val}`);
        function invariant(key, action) {
            // raise an error if property name has a '_' before the name
            if (key[0] === '_') throw new Error(`Invalid property ${action} starting with '_'`);
        }
        invariant(key, 'definition');
        return Reflect.defineProperty(...arguments);
    }
};


export default InstanceHandler;