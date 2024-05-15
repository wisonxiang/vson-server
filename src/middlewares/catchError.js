import { logger } from '@/utils/logger.js';

export default async function catchError(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error('全局异常', error);
    console.dir(error);
    ctx.fail({msg:error.msg || '服务器异常',code:error.code});
  }
}
