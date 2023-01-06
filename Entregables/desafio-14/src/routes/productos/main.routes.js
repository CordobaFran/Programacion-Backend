const { Router } = require('express')
const passport = require('passport')
const router = Router()

const Contenedor = require('../../../containers/Container')
const productos = new Contenedor()

const { users } = require('../../../db/users')

router.get("/", async (req, res) => {
    const products = await productos.getAll()
    let productExists = false
    // console.log(req.session);
    // const username = users.find(user => user.id === req.session.passport.user).username
    const username = req.user.username
    
    await products ? productExists = true : productExists = false
    res.render('main', { products, productExists, username })
    // res.json( {products}) 
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