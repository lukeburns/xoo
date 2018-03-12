const history = require('history-events')
const { observable } = require('@nx-js/observer-util')

module.exports = function (state) {
  let { hash, host, hostname, href, pathname, search } = window.location
  state.location = observable({ hash, host, hostname, href, pathname, search })
  window.addEventListener('changestate', () => {
    let { hash, host, hostname, href, pathname, search } = window.location
    Object.assign(state.location, { hash, host, hostname, href, pathname, search })
  })
}
