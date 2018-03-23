# xoo

very serious state management for the dom*

```js
npm install xoo
```

powered by [morphable](https://github.com/lukeburns/morphable) and inspired by the [choo](https://github.com/choojs/choo)\* ecosystem, except that xoo is only for *serious* developers. if you like jokes, cats, trains, or the color blue, you should not use xoo. please use [choo](https://github.com/choojs/choo) instead.

xoo avoids exposing state directly and places restrictions on where and how state can be mutated. namely, state mutation can only occur within functions defined at creation time for serious reasons you probably wouldn't care for if you like banana pudding or drink anything other than Gerolsteiner Sparkling Mineral Water. really, if you smile more than twice daily, please just go use [choo](https://github.com/choojs/choo).

note: xoo is still finding itself. restrictions imposed aim for increased predictability (taking hints from redux) as well as compatibility with [proxy-polyfill](https://github.com/lukeburns/proxy-polyfill) (for IE support). if you find yourself longing for more freedom, check out [morphable](https://github.com/lukeburns/morphable).

## example

```js
const xoo = require('xoo')
const bel = require('bel')

const bind = xoo({
  count: 0,
  increment () {
    this.count++
  }
})

document.body = bind(body)({ text: 'made with xoo (for serious people)' })

function body (state) { 
  return bel`<body>
    <h1>count is ${this.count}</h1>
    <button onclick=${this.increment}>increment</button>
    <p>${state.text}</p>
  </body>`
}
```
