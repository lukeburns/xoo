# xoo

very *serious* state management for the dom

```js
npm install xoo
```

the goal of xoo is to make state management easy peasy. define your state as plain javascript objects and views as functions returning dom elements, then simply wrap your objects and views with `xoo`. anytime you change your state, your dom elements will update too — if they depend on your state!

inspired by the wonderful [choo](https://github.com/choojs/choo) ecosystem _!_

## example

```js
const xoo = require('xoo')
const html = require('nanohtml')

const state = xoo({
  count: 0,
  increment () {
    this.count++
  }
})

document.body = xoo(body).call(state)

function body () {
  return html`<body>
    <h1>count is ${this.count}</h1>
    <button onclick=${this.increment}>increment</button>
  </body>`
}
```
