"use strict";

var _ = require('morphable');

function xoo(obj) {
  if (typeof obj === 'function') {
    var fn;
    return function () {
      if (!fn) fn = _.call(this, obj);
      return fn.apply(this, arguments);
    };
  }

  var state = _.call(this, obj);

  return new Proxy(state, {
    get: function get(target, key, receiver) {
      if (typeof target[key] === 'function' && state.hasOwnProperty(key)) {
        return function () {
          return target[key].apply(state, arguments);
        };
      }

      return target[key];
    },
    set: function set(target, key, value, receiver) {
      target[key] = value;
      return 1;
    }
  });
}

xoo.observe = _.observe;
module.exports = xoo;
