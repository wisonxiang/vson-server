import router from './index.js';

router.get('/test', (ctx) => {
  ctx.success({msg:'v1接口test'})
});

export default router
