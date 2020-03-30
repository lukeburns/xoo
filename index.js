const _ = require('morphable')

function Component (opts) {
  if (!this.render) {
    throw new Error('render must be implemented')
  }

  const self = _(this)
  Object.keys(this.__proto__).map(key => {
    if (key !== 'constructor') {
      this[key] = this.__proto__[key].bind(self)
    }
  })
  self.render = _(this.render, opts)
  return new Proxy(self, {
    get: function (target, key) {
      const res = Reflect.get(self, key)
      if (typeof res === 'function') {
        if (!self.hasOwnProperty(key)) {
          Reflect.set(self, key, res.bind(self))
        }
        return Reflect.get(self, key)
      } else {
        return res
      }
    },
    set: function (target, key, value) {
      return Reflect.set(self, key, value)
    },
    deleteProperty: function (target, key) {
      return Reflect.deleteProperty(self, key)
    },
    ownKeys: function (target, key) {
      return Reflect.ownKeys(self, key)
    },
    has: function (target, key) {
      return Reflect.has(self, key)
    },
    defineProperty: function (target, key, oDesc) {
      return Reflect.defineProperty(self, key)
    },
    getOwnPropertyDescriptor: function (target, key) {
      return Reflect.getOwnPropertyDescriptor(self, key)
    }
  })
}

function Store (store={}) {
  return _(store)
}

module.exports = {
  Component,
  Store
}