const _ = require('morphable')

function Component (opts) {
  if (!this.render) {
    throw new Error('xoo: render must be implemented')
  }

  const self = _(this)
  const proto = Object.getPrototypeOf(this)
  const keys = Object.getOwnPropertyNames(proto)
  keys.forEach(key => {
    if (key !== 'constructor') {
      this[key] = proto[key].bind(self)
    }
  })
  this.render = _(this.render, opts)
  
  return new Proxy(function(){}, {
    get: function (target, key) {
      const res = Reflect.get(self, key)
      if (typeof res === 'function') {
        if (!this.hasOwnProperty(key)) {
          Reflect.set(this, key, res.bind(self))
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
    },
    apply: function (target, thisArg, args) {
      return Reflect.apply(self.render, self, args)
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