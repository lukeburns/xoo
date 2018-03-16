const _ = require('morphable')

module.exports = xoo

function xoo (obj={}) {
  if (typeof obj === 'function') return _(obj)
  
  let use = []
  let state = strictBind(_(obj))
  const observe = function () {
    return _.apply(state, arguments)
  }
  observe.use = function (fn) {
    const init = Object.assign({}, obj)
    use.push(fn)
    state = use.reduce((prev, next) => next(prev) || prev, init)
  }
  
  observe.observable = function (obj) {
    return strictBind(_(obj))
  }
  
  return observe
  
  function strictBind (obj) { // todo: decouple state mutation restrictions from binding actions to `this`
    let running = new Set()
    return new Proxy(obj, {
      get: function (target, key, receiver) {
        if (typeof target[key] === 'function' && obj.hasOwnProperty(key)) {
          return function () {
            running.add(target[key])
            const result = target[key].apply(state, arguments)
            running.delete(target[key])
            return result
          }
        }
        return target[key]
      },
      set: function (target, key, val, receiver) {
        if (running.size === 0) throw new Error('Cannot mutate state outside of an action')
        else if (obj[key] === undefined) console.warn(`Adding new observable property ${key} dynamically in unsupported by proxy-polyfill`)
        target[key] = val
        return true
      }
    })
  }
}