"use strict";

var _ = require('morphable');

function Component(opts) {
  var _this = this;

  if (!this.render) {
    throw new Error('xoo: render must be implemented');
  }

  var self = _(this);

  var proto = Object.getPrototypeOf(this);
  var keys = Object.getOwnPropertyNames(proto);
  keys.forEach(function (key) {
    if (key !== 'constructor') {
      _this[key] = proto[key].bind(self);
    }
  });
  this.render = _(this.render, opts);
  return new Proxy(function () {}, {
    get: function get(target, key) {
      var res = Reflect.get(self, key);

      if (typeof res === 'function') {
        if (!this.hasOwnProperty(key)) {
          Reflect.set(this, key, res.bind(self));
        }

        return Reflect.get(self, key);
      } else {
        return res;
      }
    },
    set: function set(target, key, value) {
      return Reflect.set(self, key, value);
    },
    deleteProperty: function deleteProperty(target, key) {
      return Reflect.deleteProperty(self, key);
    },
    ownKeys: function ownKeys(target, key) {
      return Reflect.ownKeys(self, key);
    },
    has: function has(target, key) {
      return Reflect.has(self, key);
    },
    defineProperty: function defineProperty(target, key, oDesc) {
      return Reflect.defineProperty(self, key);
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(self, key);
    },
    apply: function apply(target, thisArg, args) {
      return Reflect.apply(self.render, self, args);
    }
  });
}

function Store() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _(store);
}

module.exports = {
  Component: Component,
  Store: Store
};
