# BASIC RENDERER

My own implementation of how **render functions** work in _JavaScript Frameworks_ using _Vanilla JavaScript's Modern Features_ like ES6 modules, classes, shortcircuiting, and more.

````javascript
import { h, mount } from "../lib/index.js";

function HelloWorld() {
    return h("h1", `Hello, World!`);
}

mount(HelloWorld, document.body);
````

> NB: This is mainly for learning purposes on how _frameworks_ do their work under the hood. I don't recommed you to create a project using this as it is plain, unsafe, and vulnerable in production.

## Target Audience

This repository is not for beginners; it's targeted at intermediate or professional developers and programers who want to take their JavaScript skills to the next level.

Some of the basics (like loops, conditionals, and closures) are not discussed at all.
If you find you need to brush up on some of those topics, refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

> **NB:** Intermediate understanding of JavaScript and some of the latest EcmaScript Standards like classes, modules, shortcircuiting, and more.

## Before You Start

Modern Frameworks like VueJS, ReactJS have an optional way of building components using render functions `h`.  Check out how they are implemented in [VueJS -> Render Functions](https://vuejs.org/guide/extras/render-function.html).

## The Architecture Behind

To understand how the work is done, I built this rendering system from scratch following the order of concerns.

1. **Helper Functions**

    There's need for some common functions to help us simplify tasks and operations.

2. **Virtual Node**

    At the core of render functions, there is a **Virtual Node** Model or Class that builds up our specifications into an object that represents an element.

    The popular `h` function (_render function_) implementation which is simply a factory of _Virtual Nodes_.

3. **Build**

    Using `h` output - _virtual node_, this function creates an **HTMLElement** or **TextNode** from it, bundles and attaches all its children and properties to the element.

4. **Mount**

    A function to attach the created element into the DOM tree through the `root` element.

## Repository Structure

There basically two folders and two files;

- `package.json` - configurations for NodeJS environment

- `README.md` - about this repository
  
- `example` - includes some examples

- `lib` - source code that implements _render functions_

## Building Blocks

To build it from scratch as you test each of the building blocks,
[**Read More**](./lib/).

## Examples

Just like modern frameworks, here is a sample of what this can also do

````javascript

h("b")
// <b></b>

h("span", "Hey!")
// <span>Hey!</span>
    
h("span", null, "Hello, ", "World!")
// <span>Hello, World!</span>
    
h("h1", { id: "heading" }, "Hello, Wolrd!")
// <h1 id="heading">Hello World!</h1>

h("div", {
        id: "welcome",
        style: { textAlign: "center" }
    }, [
        h("h2", { class: "text-2xl" }, "You're Welcome Back!"),
        h("p", "Check out what's trending in the news ever since you were away.")
    ]
)
/*  <div id="welcome" style="text-align: center">
        <h1>You're Welcome Back!</h1>
        <p>Check out what's trending in the news ever since you were away.</p>
    </div>
*/
````

I have made a few [examples](./example/) using this rendering system;

- [**Hello World**](./example/1-hello-world/)
- [**Dark Mode Switch**](./example/2-dark-mode-switch/)
- [**Todo List**](./example/3-todo-list/)

## Thoughts

In case of any issues or inquiries about this, a pull request is welcome.

Thanks.
