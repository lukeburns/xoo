const _ = require('morphable')

module.exports = function xoo (obj={}) {
  let state = _(strict(obj))
  const observe = function () {
    return _.apply(state, arguments)
  }
  observe.use = function (fn) {
    const res = fn.call(obj)
    if (typeof res === 'object') state = _(strict(res)) || state // todo: thinking to do around polyfill compatibility here (e.g. dynamically adding properties). goals include: observable window.location for routing, tracking state mutation via additional proxy wrapping, or database bindings.
  }
  return observe
}

function strict (state) {
  let runningAction = false
  return new Proxy(state, {
    get: function (target, key, receiver) {
      if (typeof target[key] === 'function' && state.hasOwnProperty(key)) {
        return function () {
          runningAction = true
          const result = target[key].apply(receiver, arguments) // todo: strict async actions?
          runningAction = false
          return result
        }
      }
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, val, receiver) {
      if (!runningAction) throw new Error('Cannot mutate state outside of an action')
      else if (state[key] === undefined) console.warn(`Adding new observable property ${key} dynamically in unsupported by proxy-polyfill`)
      return Reflect.set(target, key, val, receiver)
    }
  })
}