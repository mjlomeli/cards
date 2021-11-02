function isNodeJs(){
    /*
        Way of detecting if running on Node.js
        @return true if the program is running in NodeJs.
     */
    return (typeof process !== 'undefined') &&
        ((process.release.name === 'node') ||
        // Node (>= 3.0.0) or io.js
        (process.release.name.search(/node|io.js/) !== -1) ||
        // Node (>= 0.10.0) or io.js
        (typeof process.versions.node !== 'undefined'));
}

function isBrowser(){
    /*
        Way of detecting if running on browser.
        @return true if the program is runnin in the browser.
     */
    return (typeof window !== 'undefined')
}

function cwd() {
    if (isNodeJs())
        return process.cwd()
    else if (isBrowser()){
        let loc = window.location.href;
        return loc.substring(0, loc.lastIndexOf("/"));
    } else {
        throw new Error("Unable to detect current version of javascript.");
    }
}



function projectDirectory(rootDirectoryName){
    let loc = cwd();
    let name = rootDirectoryName.replace("/", "")
    let index = loc.indexOf(name);
    if (index === -1)
        throw new Error(`Could not find ${name} in path: ${path}`);
    let path = loc.substring(0, loc.indexOf(name)) + name;

    return path;
}



Array.prototype.multiply = function(number){
    if (!Number.isInteger(Number(number)))
        throw new Error(`Array.multiply only takes a whole number, not ${number}`);
    number = Number(number);
    let arr = [];
    while (number-- > 0)
        arr = arr.concat(this);
    return arr;
}


function product(repeat = 1, ...args) {
    // Cartesian Product: https://docs.python.org/3/library/itertools.html#itertools.product
    let pools = args.map(pool => JSON.stringify(pool)).multiply(repeat);
    let result = [[]];
    for (let pool_i = 0; pool_i < pools.length; pool_i++){
        let arr = [];
        let pool = JSON.parse(pools[pool_i]);
        for (let y_i = 0; y_i < pool.length; y_i++){
            for (let x_i = 0; x_i < result.length; x_i++){
                arr.push(result[x_i].concat(pool[y_i]));
            }
        }
        result = arr;
    }
    return result;
}


function openJson(path) {
    /*
        Must use keyword 'await' to use this.
        Ex:
            let jsonData = await openJson(path);
     */
    if (isNodeJs()){
        // path must be relative to current directory: path/to/file.json
        return require(path)
    }
    else if (isBrowser()) {
        // path must be like: http://localhost:63342/path/to/file.json
        // returns a Promise
        return fetch(path).then(response => response.json()).catch(e => e);
    } else{
        throw new Error(`Unable to detect type of Javascript running. Can't open: ${path}`)
    }
}


export {isNodeJs, isBrowser, product, cwd, projectDirectory, openJson};