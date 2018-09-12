const _ = require('morphable')


function xoo (obj={}, cb=x=>x) {
  if (typeof obj === 'function') return _(obj)

  let use = []
  let raw = _(obj)
  let state = strictBind(raw)
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

  cb.call(raw)

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

xoo._ = _

module.exports = xoo
