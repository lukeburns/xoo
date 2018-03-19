'use strict';

var _ = require('morphable');

module.exports = xoo;

function xoo() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof obj === 'function') return _(obj);

  var use = [];
  var state = strictBind(_(obj));
  var observe = function observe() {
    return _.apply(state, arguments);
  };
  observe.use = function (fn) {
    var init = Object.assign({}, obj);
    use.push(fn);
    state = use.reduce(function (prev, next) {
      return next(prev) || prev;
    }, init);
  };

  observe.observable = function (obj) {
    return strictBind(_(obj));
  };

  return observe;

  function strictBind(obj) {
    // todo: decouple state mutation restrictions from binding actions to `this`
    var running = new Set();
    return new Proxy(obj, {
      get: function get(target, key, receiver) {
        if (typeof target[key] === 'function' && obj.hasOwnProperty(key)) {
          return function () {
            running.add(target[key]);
            var result = target[key].apply(state, arguments);
            running.delete(target[key]);
            return result;
          };
        }
        return target[key];
      },
      set: function set(target, key, val, receiver) {
        if (running.size === 0) throw new Error('Cannot mutate state outside of an action');else if (obj[key] === undefined) console.warn('Adding new observable property ' + key + ' dynamically in unsupported by proxy-polyfill');
        target[key] = val;
        return true;
      }
    });
  }
}
