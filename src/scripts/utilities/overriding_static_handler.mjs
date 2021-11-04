/*
    These are tools which help with debugging. They are not used in production.
 */

const StaticHandler = {
    // Traps the 'new' operator and runs before running the constructor
    construct(target, args) {
        var str_args = args.map(value => JSON.stringify(value)).join("\x1b[36m, \x1b[0m")
        console.debug(`\x1b[36mnew ${target.name.replace("__", "")}(\x1b[0m${str_args}\x1b[36m)\x1b[0m`);
        return new target(...args);
    }
};


export default StaticHandler;