import { isArray, isString } from "./0-helpers.js";
import { VNode } from "./1-virtual-node.js";
import { isElement } from "./3-mount.js";

/**
 * Render function - `h` - creates a virtual node
 * @param {*} tag 
 * @param {*} attrs 
 * @param  {...any} children 
 * @returns 
 */
function $h(tag, attrs, ...children) { 
    // Support for no `attrs` but with `children` -> only two arguments 
    if (arguments[2] === undefined && (isString(arguments[1]) || isArray(arguments[1])) ) {
        children = arguments[1];
        attrs = {};
    }
    // result -> vnode
    return new VNode(tag, attrs, children);
}

export const h = $h;

export { default as build } from "./2-build.js";

export {default as mount } from "./3-mount.js";

export * from "./0-helpers.js";

/**
 * Select any element `el` in DOM
 * @param {*} selector 
 * @returns 
 */
export function el(selector) {
    if (isString(selector)) {
        if (/^#([a-z]+)([0-9]+)?$/i.test(selector)) {
            return document.getElementById(selector.substring(1)) || {}
        }
        return document.querySelectorAll(selector)[0] || {}
    }
    return isElement(selector) ? selector : {}
};