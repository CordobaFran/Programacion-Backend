import express from 'express'
import Productos from './daos/productosDao.js'
import Cart from './daos/carritosDao.js'
// import Productos from './daos/productos/productosDaoFirebase.js'
// const express = require('express')
const { Router } = express

const app = express()
const router = Router()
// const methodOverride = require('method-override')

// const Contenedor = require('./container')
const productos = new Productos('productos')
const cart = new Cart('carritos')

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

router.get('/carrito', async (req, res) => {
    res.json(await cart.getAll())
})

router.post('/carrito', async (req, res) => {
    const newCart = req.body
    res.status(201).send(await cart.create(newCart))
})

router.put('/carrito/:id', async (req, res) => {
    const id = req.params.id
    const dataToEdit = req.body;
    res.status(201).send(await cart.update(id, dataToEdit))
})

router.delete('/carrito/:id', (req, res) => {
    const id = req.params.id
    res.status(201).send(cart.delete(id))
})

router.get('/carrito/:id/productos', async (req, res) => {
    const cartId = req.params.id
    res.json(await cart.getById(cartId))
})

// router.post('/carrito/:id/productos', (req, res) => {
//     const cartId = parseInt(req.params.id)
//     const productId = req.body
//     res.status(201).send(cart.addProduct(cartId, productId))
// })

// router.delete('/carrito/:id/productos', (req, res) => {
//     const cartId = parseInt(req.params.id)
//     const productId = req.body
//     res.status(201).send(cart.delete(cartId, productId))
// })

app.all('*', (req, res) => {
    res.status(404).send({ error: 404, description: "ruta no encontrada" })
})

// LISTEN

app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`)
})