import router from './index.js';

router.get('/gpt', (ctx) => {
  ctx.body = 'hello gpt';
});

export default router;
