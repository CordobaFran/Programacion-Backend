const { Router } = require("express")
const routerInfo = Router()

routerInfo.get('/info', (req, res) => {
    const data = {
        args: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        executePath: process.argv[1],
        processId: process.pid,
        proyectPath: process.cwd()
        
    }
    res.render('./partials/info', {data})
})

module.exports = routerInfo