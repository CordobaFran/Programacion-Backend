import express from 'express'
import Productos from './daos/productos/productosDao.js'
console.log(Productos);
// import Productos from './daos/productos/productosDaoFirebase.js'
// const express = require('express')
const { Router } = express

const app = express()
const router = Router()
// const methodOverride = require('method-override')

// const Contenedor = require('./container')
const productos = new Productos('productos')

// const Cart = require('./cart')
// const cart = new Cart('./json/carrito.json')

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use('/api', router)

// LISTA DE PRODUCTOS
router.get("/productos", async (req, res) => {
    res.json(await productos.getAll())
})

router.post('/productos', async (req, res) => {
    const productAdded = req.body;
    res.status(201).send(await productos.create(productAdded))
})

router.get("/productos/:id", async (req, res) => {
    let id = req.params.id
    res.json(await productos.getById(id))
})

router.put('/productos/:id', async (req, res) => {
    const id = req.params.id
    const dataToEdit = req.body;
    res.status(201).send(await productos.update(id, dataToEdit))
})

router.delete('/productos/:id', async (req, res) => {
    const id = req.params.id
    res.status(201).send(await productos.delete(id))
})

// CARRITO

router.get('/carrito', (req, res) => {
    res.json(cart.getAll())
})

router.post('/carrito', (req, res) => {
    res.status(201).send(cart.addCart())
})

router.delete('/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.status(201).send(cart.deleteCartById(id))
})

router.get('/carrito/:id/productos', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.json(cart.getProductsById(cartId))
})

router.post('/carrito/:id/productos', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = req.body
    res.status(201).send(cart.addProduct(cartId, productId))
})

router.delete('/carrito/:id/productos', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = req.body
    res.status(201).send(cart.deleteProduct(cartId, productId))
})

app.all('*', (req, res) => {
    res.status(404).send({ error: 404, description: "ruta no encontrada" })
})

// LISTEN

app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`)
})