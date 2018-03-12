const store = require('store2')

let rootState

module.exports = function localStorage (state, root=true) {
  if (root) {
    state = Object.assign(state, store())
    rootState = state
  }
  return new Proxy(state, {
    get: function (target, key, receiver) {
      return typeof target[key] === 'object' ? localStorage(target[key], false) : Reflect.get(target, key, receiver)
    },
    set: function (target, key, val, receiver) {
      target[key] = val
      store(values(rootState))
      return true
    }
  })
}

function values (obj) {
  let copy = Object.assign({}, obj)
  for (key in obj) {
    if (typeof obj[key] === 'function') {
      delete copy[key]
    }
  }
  return copy
}