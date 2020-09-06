const router = require("./init");

router.get("/test1",(ctx)=>{
    ctx.body = {
        test:"test1"
    }
})

module.exports = router;