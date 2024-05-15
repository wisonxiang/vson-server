import Koa from 'koa';
import koaBody from 'koa-body'
import { initCore } from '@/core/init';

const app = new Koa();
app.use(koaBody())

// 注册路由
initCore(app);
app.listen(3100, () => {
  console.log('服务启动成功：3100');
});
