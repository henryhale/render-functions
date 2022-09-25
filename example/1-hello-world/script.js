import { h, mount } from "../../lib/index.js";

/**
 * HelloView Component 
 */
function HelloView() {
    return h("h1", `Hello, World!`);
}

// Element that will house our app
const root = document.getElementById("app");

// Mount the app into DOM
mount(HelloView, root);