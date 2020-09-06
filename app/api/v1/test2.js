const router = require("./init");

router.get("/test2",(ctx)=>{
    ctx.body = {
        test:"test2"
    }
})

module.exports = router;