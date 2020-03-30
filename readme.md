# xoo

black magic state management for dom components

```js
npm install xoo
```

the goal of xoo is to make component state management easy peasy with black magic (proxies). anytime you change your state, your dom elements will update sparsely if they depend on your state, and xoo bind `this` to your methods so you don't have to. xoo uses [morphable](https://github.com/lukeburns/morphable).

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
document.body = body.render()
```
