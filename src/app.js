import Koa from 'koa';
import koaBody from 'koa-body'
import catchError from '@/middlewares/catchError';
import routerResponse from '@/middlewares/routerResponse';
import { initCore } from '@/core/init';
import createSocket from '@/socket'

const app = new Koa();
app.use(catchError)
app.use(routerResponse())
app.use(koaBody())

// 注册路由
initCore(app);
const httpServer = createSocket(app)

httpServer.listen(3100, () => {
  console.log('服务启动成功：3100');
});
