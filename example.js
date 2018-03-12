const xoo = require('./')
const bel = require('bel')
const location = require('./location')
const logger = require('./logger')
const localStorage = require('./localStorage')

const observe = xoo({
  count: 0,
  increment () {
    this.count++
  }
})

observe.use(localStorage)
observe.use(location)
observe.use(observe.observable) 
observe.use(logger)

document.body = observe(body)({ 
  text: 'made with xoo (for serious people)' 
})

function body (state) {
  return bel`<body>
    <div id="count">
      <h1>count is ${this.count}</h1>
      <button onclick=${this.increment}>increment</button>
    </div>
    <p>${JSON.stringify(this.location)}</p>
    <p>${state.text}</p>
  </body>`
}
