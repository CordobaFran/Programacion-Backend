const express = require('express')
const { Router } = express

const app = express()
const router = Router()

const Contenedor = require('./container')
const productos = new Contenedor('productos.txt')

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(express.static('public'))


// INDEX
app.get('/', (req, res)=>{
    res.render('pages/index')
})

// LISTA DE PRODUCTOS
router.get("/productos", (req, res) => {
    const products = productos.getAll()
    res.render('pages/productos', {products})
})

router.post('/productos', (req, res) => {
    const productAdded = req.body;
    console.log(productAdded);
    productos.addProduct(productAdded)
    res.status(201).send({status:'saved'})
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

router.get("/productos/:id", (req,res) => {
    let id = parseInt(req.params.id)
    const product = productos.getById(id)
    
    res.render('pages/productoDetalle', { product })
})

// CARRITO

router.get('/carrito', (req, res)=>{
  res.render('pages/carrito')  
})

// CONFIG

app.use('/api', router)

app.listen(PORT, ()=>{
    console.log(`listening on Port ${PORT}`)
    })