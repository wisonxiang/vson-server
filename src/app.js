import Koa from 'koa';
import { initCore } from '@/core/init';

const app = new Koa();

// 注册路由
initCore(app);
app.listen(3100, () => {
  console.log('服务启动成功：3100');
});
