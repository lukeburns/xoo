const { Component, Store } = require('../')
const html = require('nanohtml')

class RandomButton extends Component {
  constructor () {
    super()
    this.number = 0
  }
  random () {
    this.number = Math.random()
  }
  render ({ time }) {
    return html`<body>
      Time: ${time}<br>
      Random Button: <button onclick=${this.random}>
        ${this.number}
      </button>
    </body>
    `
  }
}

const store = new Store({ time: 1 })
const button = new RandomButton()
document.body = button(store)
setInterval(() => store.time++, 1000)