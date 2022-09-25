/**
 * 
 * HELPERS - Functions
 * 
 */

export const isString = str => typeof str === 'string';

export const isFunction = fn => typeof fn === 'function';

export const isArray = Array.isArray;

// export const pureObj = () => Object.create(null);

export const hasOwn = (obj, key) => isObject(obj) ? Object.prototype.hasOwnProperty.call(obj, key) : false; 

export const isObject = obj => typeof obj === 'object' && obj !== null; 

export const defineKey = (obj, key, value, enumerable = true) => {

    if (!isObject(obj)) return;

    Object.defineProperty(obj, key, {
        value,
        writable: true,
        configurable: true,
        enumerable: !!enumerable,
    });
    
};

export const flattenArray = arr => {
    if (isArray(arr) && arr.some(i => isArray(i))) {
        return flattenArray([].concat(...arr)); 
    }
    return arr;
};