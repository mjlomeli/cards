/*
    This file is never used. Kept for reference when deciding which dunder methods
    I should add to any class I'm contemplating about.
 */
class MyClass {
    constructor(){
    }

    getItem(item){
        return null;
    }

    contains(other){
        if (other instanceof MyClass)
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
        return `<MyClass()>`;
    }

    format(...args){
        return `${args}`
    }

    repr(){
        return `<MyClass()>`;
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

    compare(other){
        // return -1, 0, or 1
        if (typeof other !== typeof this)
            return null;
        if (this.equals(other))
            return 0;
        return null;
    }

    greaterThan(other){
        let cmp = this.compare(other)
        if (cmp === null || cmp === undefined)
            throw new Error(`Invalid comparison between ${this} and ${other}`)
        return cmp === 1;
    }

    lessThan(other){
        let cmp = this.compare(other)
        if (cmp === null || cmp === undefined)
            throw new Error(`Invalid comparison between ${this} and ${other}`)
        return cmp === -1;
    }

    greaterThanEq(other){
        let cmp = this.compare(other)
        if (typeof cmp === null || cmp === undefined)
            throw new Error(`Invalid comparison between ${this} and ${other}`)
        return cmp === 1 || cmp === 0;
    }
    lessThanEq(other){
        let cmp = this.compare(other)
        if (cmp === null || cmp === undefined)
            throw new Error(`Invalid comparison between ${this} and ${other}`)
        return cmp === -1 || cmp === 0;
    }

    leftShift(other){

    }

    rightShift(other){

    }

    and(other){
        return false;
    }

    or(other){
        return false;
    }

    xor(other){
        return false;
    }

    add(other){
        return this;
    }

    sub(other){
        return this;
    }

    multiply(other){
        return this;
    }

    divide(other){
        return this;
    }

    mod(other){
        return this;
    }

}