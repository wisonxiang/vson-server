export default function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function ({msg, code, data}) {
      // ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.successCode || 0,
        msg: msg,
        data: data,
      };
    };

    ctx.fail = function ({msg, code}) {
      // ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 500,
        msg: msg || option.successMsg || 'fail',
      };
    };

    await next();
  };
}
