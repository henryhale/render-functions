import { hasOwn, isArray, isFunction, isObject, isString } from "./0-helpers.js";
import { isVNode, TEXT_NODE } from "./1-virtual-node.js";

/**
 * Add `events` to the real element node `el` 
 * @param {*} el 
 * @param {*} events 
 */
function applyEvents(el, events = {}) {
    if (isObject(events)) {
        // for each event, add it's listener if it is a function
        Object.keys(events).forEach(event => {
            el?.addEventListener(event, e => {
                isFunction(events[event]) && (events[event].call(events, e));
            });
        });
    }
}

/**
 * Add `attributes` to the real element node `el`
 * @param {*} el 
 * @param {*} attributes 
 */
function applyAttributes(el, attributes = {}) {
    if (isObject(attributes)) {
        // add each attribute in the `attributes` object 
        Object.keys(attributes).forEach(key => {
            el.setAttribute(key, attributes[key]);
        });
    }
}

/**
 * Add a `style` attribute directly to the element node `el`
 * @param {*} el 
 * @param {*} styles 
 */
function applyStyles(el, styles = {}) {

    // A function to parse camelCase styles string into CSS-like naming
    function parseStyleName(str) {
        // find matches of caps
        const matches = str.match(/[A-Z]+/g);
        // locate any uppercase letters if any
        if (isArray(matches)) {
            // replace > `backgroundColor` with `background-color`
            matches.forEach(match => {
                str = str.replace(match, "-"+match.toLowerCase());
            });
        } 
        // otherwise 
        return str.toLowerCase();
    }
    
    // Styles result string 
    let styleStr = "";

    // for each style, parse it's key and concat it on the result
    for (const style in styles) {
        if (hasOwn(styles, style)) {
            styleStr += `${parseStyleName(style)}: ${styles[style]}; `;      
        }
    }

    // finally add the result if it exists
    styleStr && el.setAttribute("style", styleStr.trim());

}

/**
 * Create a fully compiled `element` node from it's corresponding virtual node `vnode` 
 * @param {*} vnode 
 * @returns HTMLElement
 */
export default function build(vnode = {}) {
    
    // Create text nodes for primitive types
    if (isString(vnode) || typeof vnode === 'number') {
        return document.createTextNode(vnode);
    }

    // Create element node from `vnode` properties
    if (isVNode(vnode)) {
        // incase it's a text vnode
        if (vnode?.tag === TEXT_NODE) {
            return build(vnode?.children);
        }
        // otherwise, create real dom element
        const $el = document.createElement(vnode?.tag);
        // apply properties
        applyStyles($el, vnode?.styles ?? {});
        applyAttributes($el, vnode?.attrs ?? {});
        applyEvents($el, vnode?.events ?? {});
        // compile children & attach them 
        if (isArray(vnode?.children)) {
            vnode.children.forEach(child => {
                $el.append(build(child));
            });
        } else {
            $el.append(build(child));
        }
        // return element node
        return $el;
    }

    // incase the vnode is of bad type
    return null;
}