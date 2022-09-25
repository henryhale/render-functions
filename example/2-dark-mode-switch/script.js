import { h, mount } from "../../lib/index.js";

/**
 * HelloView Component 
 *  -> display a heading
 */
function HelloView({ name = 'World' }) {
    return h("h1", `Hello,  ${name}!`);
}

/**
 * Dark Mode Switch Component 
 *  -> toggle dark mode 
 */
function DarkModeSwitch() {
    return h("button", {
        class: "btn",
        onClick: () => {
            document.body.classList.toggle("dark");
        }
    }, "Switch Mode");
}

/**
 * App Component 
 */
function AppView() {
    
    const state = {
        name: "Dev"
    };

    const styles = {
        textAlign: "center",
        border: "2px solid rgba(221, 221, 221, 0.5)",
        borderRadius: "10px",
        padding: "20px"
    };

    return h("div", {
            styles,
        }, 
        HelloView({ name: state.name }), 
        DarkModeSwitch()
    );
}

// Mount the app into DOM
mount(AppView, document.getElementById("app"));