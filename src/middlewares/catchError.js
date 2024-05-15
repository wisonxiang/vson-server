import { logger } from '@/utils/logger.js';

export default async function catchError(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger.error('全局异常', error);
    ctx.fail(error.msg || '服务器异常');
  }
}
