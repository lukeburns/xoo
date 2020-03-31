# xoo

black magic state management for dom components

```js
npm install xoo
```

the goal of xoo is to make reactive component state management easy peasy with black magic (i.e. proxies) for rapid prototyping. anytime you change your state, your components will update sparsely if they depend on your state. xoo bind `this` to your Component's methods so you don't have to.

xoo is built on [morphable](https://github.com/lukeburns/morphable)

## example

```js
const { Component } = require('xoo')
const html = require('nanohtml')

class Body extends Component {
  constructor () {
    super()
    this.count = 0
  }
  increment () {
    this.count++
  }
  render () {
    return html`<body>
      <h1>count is ${this.count}</h1>
      <button onclick=${this.increment}>increment</button>
    </body>`
  }
}

const body = new Body()
document.body = body() // alias for body.render()
```
