const xoo = require('./')
const bel = require('bel')

const observe = xoo({
  count: 0,
  increment () {
    this.count++
  }
})

document.body = observe(body)({ 
  text: 'made with xoo (for serious people)' 
})

function body (state) { 
  return bel`<body>
    <h1>count is ${this.count}</h1>
    <button onclick=${this.increment}>increment</button>
    <p>${state.text}</p>
  </body>`
}