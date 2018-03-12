const _ = require('morphable')

module.exports = xoo

function xoo (obj={}) {
  let use = []
  let state = _(strictBind(obj))
  const observe = function () {
    return _.apply(state, arguments)
  }
  observe.use = function (fn) {
    const init = Object.assign({}, obj)
    use.push(fn)
    state = use.reduce((prev, next) => next(prev) || prev, init)
  }
  
  observe.observable = function (obj) {
    return _(strictBind(obj))
  }
  
  return observe
  
  function strictBind (obj) { // todo: decouple state mutation restrictions from binding actions to `this`
    let runningAction = false
    return new Proxy(obj, {
      get: function (target, key, receiver) {
        if (typeof target[key] === 'function' && obj.hasOwnProperty(key)) {
          return function () {
            runningAction = true
            const result = target[key].apply(state, arguments) // todo: strict async actions?
            runningAction = false
            return result
          }
        }
        return Reflect.get(target, key, receiver)
      },
      set: function (target, key, val, receiver) {
        if (!runningAction) throw new Error('Cannot mutate state outside of an action')
        else if (obj[key] === undefined) console.warn(`Adding new observable property ${key} dynamically in unsupported by proxy-polyfill`)
        return Reflect.set(target, key, val, receiver)
      }
    })
  }
}