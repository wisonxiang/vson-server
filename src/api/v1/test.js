import router from './index.js';
import { logger } from '@/utils/logger.js';

router.get('/test', (ctx) => {
  ctx.body = 'hello test'
});

export default router
