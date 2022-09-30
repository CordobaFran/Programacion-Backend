const express = require('express')
const { Router } = express

const app = express()
const router = Router()

const handlebars = require('express-handlebars')

const Contenedor = require('./container')
const productos= new Contenedor ('productos.txt')
//install body parser to read body on a post
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const PORT = 8080

// app.engine('hbs', 
//     handlebars.engine({
//         extname: '.hbs',
//         defaultLayout: 'index.hbs',
//         layoutsDir: __dirname + '/views/layouts',
//         partialsDir: __dirname + '/views/partials/'
//     })
// )

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    const nombre = "fran"
    res.render('addProduct.pug', {nombre})
})

router.get("/productos", (req, res) => {
    const products = productos.getAll()
    let productExists = false
    productos.getAll() ? productExists = true : productExists = false
    res.render('products.pug', {products, productExists})
} )

router.post("/productos", (req, res) => {
    const productsAdd = req.body;
    productos.addProduct(productsAdd)
    res.status(201).redirect('/productos')
} )

app.use('', router)

app.listen(PORT, ()=>{
console.log(`listening on Port ${PORT}`)
})

