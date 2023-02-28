const { Router } = require('express')
const router = Router()

const ApiProductosMock = require('../../../api/productos')
const { loggerError } = require('../../../logger')
const apiProductos = new ApiProductosMock()


router.post('/popular', async (req, res, next) => {
    try {
        res.json(await apiProductos.popular(req.query.cant))
    } catch (error) {
        loggerError.error(error)
        next(error)
    }
})

router.get('/productos-test', async (req, res, next) => {
    try {
        await apiProductos.deleteall()
        await apiProductos.popular(req.query.cant)
        res.status(200).json(await apiProductos.getAll())
    } catch (error) {
        loggerError.error(error)
        next(error)
    }
})


module.exports = router