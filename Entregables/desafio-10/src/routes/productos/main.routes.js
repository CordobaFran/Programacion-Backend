const { Router } = require('express')
const router = Router()

const Contenedor = require('../../../containers/Container')
const productos = new Contenedor()


router.get("/", async (req, res) => {
    const products = await productos.getAll()
    let productExists = false
    const username = req.session.user

    await products ? productExists = true : productExists = false
    res.render('main', { products, productExists, username })
    // res.json( {products}) 
})

router.get("/logout" , async (req, res) => {
    const username = req.session.user;
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
    res.render('logout', { username })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await productos.getById(id))
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const productData = req.body
    res.json(await productos.editById(id, productData))
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await productos.deleteById(id))
})

module.exports = router