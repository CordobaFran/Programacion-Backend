const { Router } = require('express')
const router = Router()

const { cartsAll, cartId, cartCheckout } = require('../../controller/carts.controller')

router.get('/', cartsAll)
router.get('/:id', cartId)

router.post('/:id', cartCheckout)

module.exports = router