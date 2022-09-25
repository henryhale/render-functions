import { 
    defineKey, 
    flattenArray, 
    hasOwn, 
    isArray, 
    isObject, 
    isString 
} from "./0-helpers.js";

/**
 * Text Node Reference
 */
export const TEXT_NODE = "#text";

/**
 * Check if its a virtual node object
 * @param {*} vn 
 * @returns Boolean
 */
export const isVNode = vn => (vn instanceof VNode) || (isObject(vn) && vn?.tag && vn?.attrs && vn?.events && vn?.children);

/**
 * 
 * Virtual Node 
 * 
 */
export class VNode {

    // Secret properties
    #node = {
        // element tag name
        tag: null,
        // attributes - attr: value 
        attrs: {},
        // events - event: callback
        events: {},
        // styles - can be a string or object 
        styles: {},
        // children - group of children -> array
        children: []
    }

    constructor (tag = TEXT_NODE, attrs = {}, children = []) {

        // VNode must have a tag name
        if (!tag || !isString(tag)) {
            return;
        }

        // Set element tag name
        this.#node.tag = tag;

        // Destruct `attrs` into `events`, `styles` and the rest remain `attributes`
        if(isObject(attrs)) {
            for (const key in attrs) {
                if (hasOwn(attrs, key)) {
                    this.#setProp(key, attrs[key]);
                }
            }
        }

        // Setup children
        this.#node.children = this.#setupChildren(children); 

        // console.log(tag, children, this.#node.children);

    }
    
    // Method -> to set the property in a specific group
    #setProp(key, value) {

        // Events -> camelCase e.g onClick
        if (/on?[A-Z][a-z]+/g.test(key)) {
            // remove `on` and key into lowercase e.g click
            defineKey(this.#node.events, key.slice(2).toLowerCase(), value);
            // stop here
            return;
        }

        // Styles -> display: 'block'
        if (["styles","style"].includes(key)) {
            
            if (isObject(value)) {
                for (const style in value) {
                    if (hasOwn(value, style)) {
                        defineKey(this.#node.styles, style, value[style])                        
                    }
                }
            } else if (isString(value)) {
                this.#node.styles = value;
            }
            // stop here
            return;
        }

        // Otherwise, it is just like any inline attribute
        defineKey(this.#node.attrs, key, value);
    }

    // Method -> to organise children into an array for proper handling
    #setupChildren (group = []) {
        
        // Function to check if the `child` is valid 
        const isValid = child => child && (isString(child) || isVNode(child))
        
        // in case it's already an array, just flatten & clean up junk
        if (isArray(group)) {
            // incase of arrays in arrays, flatten to for one array & clean up
            return flattenArray(group).filter(child => {
                return isValid(child)
            });

        } else
        // in case it's a single child, wrap it
        if (isValid(group)) {
            return [group];
        } 
        // this node has no children
        return [];
    }

    // Get element's tag name
    get tag () {
        return this.#node.tag;
    }

    // Get element's attributes
    get attrs () {
        return this.#node.attrs;
    }

    // Get element's events
    get events () {
        return this.#node.events;
    }

    // Get element's styles
    get styles () {
        return this.#node.styles;
    }

    // Get element's children
    get children () {
        return this.#node.children;
    }

}