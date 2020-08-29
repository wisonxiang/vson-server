const Koa = require('koa')

const app = new Koa()

app.use((ctx,next)=>{
    ctx.body = {
        res:'hello koa'
    }
})

app.listen(3000)