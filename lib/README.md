![3d-select](https://user-images.githubusercontent.com/92443116/192309362-96ce8587-58e1-449a-b52a-81233976e647.png)

# BASIC RENDERER

Build your own rendering system from scratch. To do this, you must read and understand the source code `/lib/` and information in this `./README.md`

Let's get started :)

## Environment Setup

**NodeJS** or **Browser**

I recommed you to just use the **Browser** other than the **NodeJS** environment.

1. Clone this repository, create a folder `my-workspace` under this workspace.
2. Create `index.html` to house our `scripts` and `styles`
3. Your folder structure should at least be like

    **Folder Structure**

    ````txt
     > example
     > lib
     > my-workspace
       |  > index.html
       |  > script.js
     > package.json
     > README.md
    ````

    `my-workspace/index.html`

    ````html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Test App</title>
        
        <link rel="stylesheet" href="../assets/styles.css">
        
        <script defer type="module" src="./script.js"></script>

    </head>
    <body>

        <div id="app"></div>

    </body>
    </html>
    ````

    `my-workspace/script.js`

    We shall use this file to learn how everything works. But for now, let's just add

    ````javascript
    console.log("Hello, World!");
    ````

4. Open the `my-workspace/index.html` in your **browser** (Chrome/FireFox/Edge) with tools like **_LiveServer_**.

5. Open **Dev Tools** and go to the **Console** where we shall view our _output_.

## Building Blocks

In this section, there are examples on how each of the building blocks works.

> **NB:** _Some parts of the source code have comments that might help you clearly understand what's going on._

All the code goes into your folder, `my-workspace/script.js`, open **Dev Tools > Console** in your **browser** for the output.

### 1. [Helper Functions](./0-helpers.js)

Provides these functions;

- **`isString`** - checks if the argument is a `string`
- **`isFunction`** - checks if the argument is a `function`
- **`isArray`** - checks if the argument is a `array`
- **`isObject`** - checks if the argument is a `object`
- **`hasOwn`** - determine whether the object `obj` has an property with a specified name `key`
- **`defineKey`** - defines a named property `key` on an object `obj` with a specified `value`
- **`flattenArray`** - convert an array of arrays into just on single `array` containing all items

#### Example 1

````javascript
import { 
    isString,
    isFunction,
    isArray,
    isObject,
    hasOwn,
    defineKey,
    flattenArray
} from "../lib/index.js";

// isString
console.log(isString("Hello, World!"));
// > true  

// isFunction
console.log(isFunction(alert));
// > true

// isArray
console.log(isArray([1,2,3]));
// > true

// isObject
console.log(isObject({ name: "Brad Traversy" }));
// > true

// hasOwn
console.log(hasOwn({ name: "Brad Traversy" }, "name"));
// > true
console.log(hasOwn({ name: "Brad Traversy" }, "age"));
// > false

// defineKey
const state = {};
defineKey(state, "count", 0);
console.log(state);
// > { count: 0 } 

// flattenArray
const arr = [[[[[[[0,[[1]],2],3],4],5],6],7],[[8],[9]]];
console.log(flattenArray(arr));
// > [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
````

### 2. [Virtual Node](./1-virtual-node.js)

This includes a class that is built on top of **Helper Functions** to implement a simple representation of an **HTMLElement** using ES Classes.

- `VNode` - a class to implement the virtual node of an element
- `isVNode` - function to checks whether or not the argument is a valid virtual node

#### Example 2

````javascript
import { VNode, isVNode } from "../lib/1-virtual-node.js";

// Raw Heading One
const h1 = new VNode("h1", {}, "Hello, World!");

// Output
console.log(h1, isVNode(h1));
// > VNode { ... } true
````

Check out it's structure and read the comments to follow along -> [_here_](./1-virtual-node.js)

### 3. Build

After creating a `VNode` there's is need to create a real **HTMLElement** out of it using a `build` function. It compiles all properties of the `VNode` and attaches them to the element.

#### Example 3

````javascript
import { VNode, isVNode } from "../lib/1-virtual-node.js";

import build from "../lib/2-build.js";

// Raw Heading One
const h1 = new VNode("h1", {}, "Hello, World!");

// H1 element
const el = build(h1);

// Output
console.log(h1)
// h1 { ... } or <h1>Hello, World!</h1>
````

Check out it's structure and read the comments to follow along -> [_here_](./2-build.js)

The created element is now ready for patching into DOM.

### 4. Mount

This function simply attaches the `el` created element into DOM through a specified `root` element which is `document.body` by default.

Specifying the `isFresh` parameter as `false` does not remove existing content in the `root` element. Otherwise, it is `true` by default.

#### Example 4

Since there is a `div#app` in our markup `my-workspace/index.html` we use that as our `root` element.

````javascript
import { VNode, isVNode } from "../lib/1-virtual-node.js";

import build from "../lib/2-build.js";

import mount from "../lib/3-mount.js";

// Raw Heading One
const h1 = new VNode("h1", {}, "Hello, World!");

// H1 element
const el = build(h1);

// root element
const root = document.getElementById("app");

// Mount into DOM
mount(el, root);
// displays `Hello, World` in the browser body
````

Check out it's structure and read the comments to follow along -> [_here_](./3-mount.js)
