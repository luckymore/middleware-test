'use strict'

module.exports = () => {
  return async function errorHandler(ctx, next) {
    // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
    // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    // 从 error 对象上读出各个属性，设置到响应中

    const { app } = ctx
    try {
      await next()
    } catch (err) {
      app.emit('error', err, ctx)
      console.log('------errorHandler2', err)
      const status = err.status || 500
      const error = status === 500 && app.config.env === 'prod' ? '服务器错误' : err.message

      ctx.body = { error }
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  }
}
