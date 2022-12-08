 const { httpServer, socketIo} = require('./socketio')

const PORT = process.env.PORT || 4000
// const { SocketAddress } = require('net')

httpServer.listen(PORT, () => { console.log(`Server Online on Port ${PORT}`) })

socketIo



