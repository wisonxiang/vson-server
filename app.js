require("module-alias/register");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const InitManager = require("@core/init");

const app = new Koa();
app.use(bodyParser());
InitManager.InitCore(app);

app.listen(3000);
