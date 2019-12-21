# xoo

very serious state management for the dom*

```js
npm install xoo
```

powered by [morphable](https://github.com/lukeburns/morphable) and inspired by the [choo](https://github.com/choojs/choo)\* ecosystem, except that xoo is only for *serious* developers. if you like jokes, cats, trains, or the color blue, you should not use xoo. please use [choo](https://github.com/choojs/choo) instead.

xoo creates reactive views bound to plain javascript objects from pure views. dom is updated as state that it depends upon is mutated.

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
