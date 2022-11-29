const express = require('express')
const { Router } = express

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const router = Router()

const handlebars = require('express-handlebars')

const Contenedor = require('./containers/Container')
const productos = new Contenedor()

const { Chat } = require('./chat')
const msjs = new Chat("chat")

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

const bp = require('body-parser')
const { SocketAddress } = require('net')

const ApiProductosMock = require('./api/productos')
const apiProductos = new ApiProductosMock()

// const schemaNormalizr = require('./utils/schemaNormalizr')
// const { normalizedChatpost, denormalizedChatPost } = schemaNormalizr

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

app.use('/api', router)

// router.post('/popular', async (req, res, next)=> {
//     try {
//         res.json(await apiProductos.popular(req.query.cant))
//     } catch (error) {
//         next(error)        
//     }
// })

router.get('/productos-test', async (req, res, next)=> {
    try {
        await apiProductos.deleteall()
        await apiProductos.popular(req.query.cant)
        res.json(await apiProductos.getAll())
    } catch (error) {
        next(error)        
    }
})

router.get("/", async (req, res) => {
    const products = await productos.getAll()
    let productExists = false
    await products ? productExists = true : productExists = false

    res.render('main', { products, productExists })
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

httpServer.listen(PORT, () => { console.log('Server On') })


io.on('connection', async socket => {
    const products = await productos.getAll()
    const messages = await msjs.getMsj()

    console.log("usuario conectado");
    socket.emit("products-sv", products)
    socket.on('add-product', async (data) => {
        await productos.addProduct(data)
        io.sockets.emit('products-sv', await productos.getAll())
    }
    )
    socket.emit("messages", messages)
    socket.on("new-message", async (data) => {
        await msjs.addMsj(data)
        io.sockets.emit("messages-sv", await msjs.getMsj())

    })


})



