import router from './index.js';
import validArray from '@/validations/validArray'

router.get('/test', (ctx) => {
  const arr = ctx.request.query.arr
  validArray('content',arr)
  ctx.success({msg:'v1接口test'})
});

export default router
