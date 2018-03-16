const xoo = require('./')
const bel = require('bel')

const observe = xoo({
  count: 0,
  list: [Math.random()],
  increment () {
    this.count++
  },
  append () {
    this.list.push(Math.random())
  }
})

document.body = observe(body)({ 
  text: 'made with xoo (for serious people)' 
})

function body (state) {
  return bel`<body>
    <div id="actions">
      <button onclick=${this.increment}>increment</button>
      <button onclick=${this.append}>append</button>
    </div>
    <div id="count">
      <p>count is ${this.count}</p>
    </div>
    <div id="list">
      <ul>
        ${this.list.map(li => bel`<li>${li}</li>`)}
      </ul>
    </div>
    <p>${state.text}</p>
  </body>`
}
