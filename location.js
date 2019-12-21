const history = require('history-events')
const xoo = require('./')

module.exports = () => {
  var { hash, host, hostname, href, pathname, search } = window.location
  var location = xoo({ hash, host, hostname, href, pathname, search })
  window.addEventListener('changestate', () => {
    var { hash, host, hostname, href, pathname, search } = window.location
    Object.assign(location, { hash, host, hostname, href, pathname, search })
  })
  return location
}
