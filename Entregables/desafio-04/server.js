const express = require ('express')
const { Router } = express

const app = express()
const router = Router()

//Puerto
const PORT = 8080

//Import de Container.js
const Contenedor = require('./container')
const productos= new Contenedor ('productos.txt')

//install body parser to read body on a post
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

router.get("/productos", (req, res) => {
    res.json(productos.getAll())
} )

router.get("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id)
    res.json(productos.getById(id))
} )

router.post("/productos", (req, res) => {
    const productsAdd = req.body;
    productos.addProduct(productsAdd)
    res.status(201).send({status:"saved"})
} )

router.put("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id)
    const productEdited = req.body;
    res.status(201).send(productos.editById(id, productEdited))
} )

router.delete("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id)
    res.status(201).send(productos.deleteById(id))
} )

app.use(express.static('public'))

app.use('/api', router)

app.listen(PORT)