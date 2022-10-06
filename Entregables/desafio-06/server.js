const express = require('express')
const { Router } = express

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const router = Router()

const handlebars = require('express-handlebars')
const Contenedor = require('./container')
const productos= new Contenedor ('productos.txt')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.engine('hbs', 
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)

app.set('view engine', 'hbs');
app.set('views', './views')

app.use(express.static('./public'))

app.use('', router)

router.get("/test", (req, res) => {
    const products = productos.getAll()
    let productExists = false
    productos.getAll() ? productExists = true : productExists = false
    res.render('main', {products, productExists})
})

app.get('/', (req, res)=>{
    res.sendFile('index.html', { root: __dirname})
})

httpServer.listen(PORT, ()=>{ console.log('Server On') })

const messages = [
    {"name": "Franco", "message": "Hola"},
    {"name": "Kevin", "message": "Hola"},
    {"name": "Franco", "message": "Todo bien cornudo?"},
    {"name": "Kevin", "message": "re"},
]

io.on('connection', socket=>{
    const products = productos.getAll()
    console.log("usuario conectado");
    socket.emit("products-sv", products)
    socket.on('add-product', (data)=>{
                productos.addProduct(data)
                io.sockets.emit('products-sv', products)
            }
    )
    socket.on("new-message", (data)=>{
        messages.push(data)
        io.sockets.emit("messages-sv", messages)
    })
    

})



