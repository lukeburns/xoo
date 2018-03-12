const xoo = require('./')
const bel = require('bel')
const location = require('./location')
const logger = require('./logger')

const observe = xoo({
  count: 0,
  increment () {
    this.count++
  }
})

observe.use(location)
observe.use(observe.observable)
observe.use(logger)

document.body = observe(body)({ 
  text: 'made with xoo (for serious people)' 
})

function body (state) {
  return bel`<body>
    <h1>count is ${this.count} ${this.name}</h1>
    <button onclick=${this.increment}>increment</button>
    <p>${state.text}</p>
    <p>${JSON.stringify(this.location)}</p>
  </body>`
}