const express = require('express')
const { Router } = express

const app = express()
const router = Router()
const methodOverride = require('method-override')

const Contenedor = require('./container')
const productos = new Contenedor('./json/productos.json')

const Cart = require('./cart')
const cart = new Cart('./json/carrito.json')

let admin = false

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use('/api', router)

app.set('view engine', 'ejs');


//not found
// app.get('*', (req, res) => {
//     res.status(404).send({error:404, description: "ruta no encontrada"})
// })

// INDEX
app.get('/', (req, res)=>{
    res.render('pages/index')
})

app.post('/', (req, res) => {
    adminBody = req.body
    admin =  (adminBody.admin === "true")
    res.status(201).send(adminBody)
})

// LISTA DE PRODUCTOS
router.get("/productos", (req, res) => {
    const products = productos.getAll()
    console.log(admin);
    res.render('pages/productos', {products, admin})
    // res.json(productos.getAll())
})

router.post('/productos', (req, res) => {
    const productAdded = req.body;
    res.status(201).send(productos.addProduct(productAdded))
})

router.get("/productos/:id", (req,res) => {
    let id = parseInt(req.params.id)
    const product = productos.getById(id)  
    res.render('pages/productoDetalle', { product, admin })
})

router.put( '/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const productEdited = req.body;
    res.status(201).send(productos.editById(id, productEdited))
})

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.status(201).send(productos.deleteById(id))
})


// CARRITO

router.get('/carrito', (req, res) =>{   
//   res.render('pages/carrito')
    res.json(cart.getAll())
})

router.post('/carrito', (req, res) => {
    res.status(201).send(cart.addCart())
})

router.delete('/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.status(201).send(cart.deleteCartById(id))
})

router.get('/carrito/:id/productos', (req, res) =>{
    const cartId = parseInt(req.params.id)   
    //   res.render('pages/carrito')
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
    res.status(404).send({error:404, description: "ruta no encontrada"})
})

// LISTEN

app.listen(PORT, ()=>{
    console.log(`listening on Port ${PORT}`)
    })