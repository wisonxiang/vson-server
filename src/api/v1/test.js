import router from './index.js';

router.get('/test', (ctx) => {
  ctx.body = 'hello test'
});

export default router
