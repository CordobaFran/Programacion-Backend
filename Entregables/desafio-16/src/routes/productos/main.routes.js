const { Router } = require('express')
const router = Router()

const { getProducts, getProductId, editProduct, deleteProduct } = require('../../controller/products.controller')

router.get("/", getProducts)

router.get("/:id", getProductId)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

module.exports = router