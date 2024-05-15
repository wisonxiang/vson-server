import router from './index.js';

router.get('/gpt', (ctx) => {
  ctx.body = 'hello gpt v2';
});

export default router;
