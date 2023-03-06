const { Router } = require('express')
const router = Router()

const { getProducts, getProductId, editProduct, deleteProduct, getOnlyProducts } = require('../../controller/products.controller')

router.get("/products", getOnlyProducts)

router.get("/", getProducts)

router.get("/product/:id", getProductId)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

module.exports = router