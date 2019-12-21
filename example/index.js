const xoo = require('../')
const html = require('nanohtml')

const state = xoo({
  count: 0,
  list: [Math.random()],
  increment () {
    this.count++
  },
  append () {
    this.list.push(Math.random())
  }
})

document.body = xoo(body).call(state)

function body () {
  return html`<body>
    <div id="actions">
      <button onclick=${this.increment}>increment</button>
      <button onclick=${this.append}>append</button>
    </div>
    <div id="count">
      <p>count is ${this.count}</p>
    </div>
    <div id="list">
      <ul>
        ${this.list.map(li => html`<li>${li}</li>`)}
      </ul>
    </div>
  </body>`
}
