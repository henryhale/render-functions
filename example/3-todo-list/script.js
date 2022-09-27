import { el, h, build, mount } from "../../lib/index.js";

/**
 * HeadingView Component
 *  -> display a heading with a `title` 
 */
function HeadingView({ title = "App" }) {
    return h("h1", `#: ${title}`);
}

/**
 * AddTodoItem Component
 *  -> display a form to add a new todo item
 */
function AddTodoItem() {
    return h("form", {
        action: "#",
        onSubmit: e => {
            e.preventDefault();
            let input = el("[name='todo']");
            if (input && input?.value) {
                el("ul")?.prepend(
                    build(
                        h("li", input.value)
                    )
                );
                input.value = '';
            }
        }    
    }, [
        h("input", { 
            name: "todo",
            type: "text",
            placeholder: "What's on your hand?"
        }),
        h("button", {
            type: "submit",
            class: "btn",
            style: "width: 80%"
        }, "+ Add")
    ])
}

/**
 * ListView Component
 * -> display a list of items
 */
function ListView({ list = [] }) {
    return h("ul", {
        style: {
            textAlign: "left"
        }
    }, list.map(item => h("li", item)))
}

/**
 * Dark Mode Switch Component 
 *  -> toggle dark mode 
 */
function BtnSwitch() {
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
    
    // initial state
    const state = {
        title: "To-Do App",
        todos: [
            "Watch Brad's Web Dev Guide 2022",
            "Create my own blog from scratch",
            "Call John Doe at 4PM"
        ]
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
        BtnSwitch(),
        HeadingView({ title: state.title }),
        AddTodoItem(),
        ListView({ list: state.todos }),
    );
}

// Mount app into DOM 
mount(AppView, document.getElementById("app"));