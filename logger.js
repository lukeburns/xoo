module.exports = function logger (state) {
  return new Proxy(state, {
    get: function (target, key, receiver) {
      if (target.hasOwnProperty(key)) console.log('get', key, target[key], target)
      return target[key]
    },
    set: function (target, key, val, receiver) {
      if (target.hasOwnProperty(key)) console.log('set', key, val, target)
      return target[key] = val
    }
  })
}