const express = require ('express')
const { Router } = express

const app = express()
const router = Router()

//Puerto
const PORT = 8080

//Import de Container.js
const Contenedor = require('./container')
const productos= new Contenedor ('productos.txt')

const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

router.get("/productos", (req, res) => {
    res.json(productos.getAll())
} )

router.get("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id)
    res.json(productos.getById(id))
    res.send("hola")
} )

router.post("/productos", (req, res) => {
    const productsAdd = req.body;
    console.log(req.body);
    productos.addProduct(productsAdd)
    res.status(201).send({status:"saved"})
} )

app.use('/api', router)

app.listen(PORT)