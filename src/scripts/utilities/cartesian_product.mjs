
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


export {product}