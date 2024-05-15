import path from 'path'
import fs from 'fs'

const apiList = [{path:'/api/v1'},{path:'/api/v2'}]
function initCore(app) {
  apiList.forEach(api=>{
    const apiDir =  path.resolve(__dirname,`..${api.path}`)
    fs.readdirSync(apiDir).forEach((file)=>{
      if(file === 'index.js') return;
      const router = require(`${apiDir}/${file}`);
      app.use(router.default.routes());
      app.use(router.default.allowedMethods());
    })
  })
}

export { initCore }

// import Router from "koa-router";
// const router = new Router()