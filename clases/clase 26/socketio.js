const app = require('./app')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./containers/Container')
const productos = new Contenedor()

const Chat = require('./chat')
const msjs = new Chat("chat")

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

module.exports = {
    io,
    httpServer
}