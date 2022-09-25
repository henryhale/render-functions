import { isFunction, isString } from "./0-helpers.js";
import { isVNode } from "./1-virtual-node.js";
import build from "./2-build.js";

/**
 * Check if `el` is an HTML element
 * @param {*} el 
 * @returns Boolean 
 */
export const isElement = el => el instanceof HTMLElement || el === document.body;

/**
 * Patch the `app` into real dom tree through the `root` element 
 * @param {*} app 
 * @param {*} el 
 * @param {*} isFresh 
 */
export default function mount(app, root = document.body, isFresh = true) {
    // must be an element
    if (!isElement(root)) return;

    // if `isFresh` is true, clean all contents in the `root`, otherwise keep them
    isFresh && (root.innerHTML = "");

    // check the `app`
    
    // primitives
    if (isString(app) || typeof app === 'number') {
        root.innerHTML += app;
    }
    
    // already made element
    if (isElement(app)) {
        root.appendChild(app);
    }
    
    // raw or virtual element node
    if (isVNode(app)) {
        root.append(build(app));
    } 
    
    // incase it is a function component
    if (isFunction(app)) {
        // invoke and re-call mount with the result
        mount(app.call(), root, isFresh);
    }

}