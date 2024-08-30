import router from './index.js';

router.get('/room-list', (ctx) => {
  ctx.success({ data: [{ name: '热聊房1', status: 1, nums: 1 }] });
});

export default router;
