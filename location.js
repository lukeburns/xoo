const history = require('history-events')
const { observable } = require('@nx-js/observer-util')

module.exports = function () {
  let { hash, host, hostname, href, pathname, search } = window.location
  this.location = observable({ hash, host, hostname, href, pathname, search })
  window.addEventListener('changestate', () => {
    let { hash, host, hostname, href, pathname, search } = window.location
    Object.assign(this.location, { hash, host, hostname, href, pathname, search })
  })
}
