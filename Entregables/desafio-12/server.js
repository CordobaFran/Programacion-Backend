const { options } = require('./options/options')

const { httpServer, socketIo } = require('./socketio')

const PORT = options.PORT
// const { SocketAddress } = require('net')

httpServer.listen(PORT, () => { console.log(`Server Online on Port ${PORT}`) })

socketIo



