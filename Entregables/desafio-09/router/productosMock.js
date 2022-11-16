const {Router} = require('express')
const ApiProductosMock = require('../api/productos')

const apiProductos = ApiProductosMock()

const router = Router()

router.post('/popular', async (req, res, next)=> {
    try {
        res.json(await apiProductos.popular(req.query.cant))
    } catch (error) {
        next(error)        
    }
})

router.get('/productos-test', async (req, res, next)=> {
    try {
        res.json(await apiProductos.getAll())
    } catch (error) {
        next(error)        
    }
})

module.exports = router