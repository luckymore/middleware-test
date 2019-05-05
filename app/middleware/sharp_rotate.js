'use strict'

module.exports = () => {
  return async function sharpRotate(ctx, next) {
    const start = Date.now()
    await next()
    console.log('rotate 时间消耗: ', Date.now() - start, 'ms')
  }
}
