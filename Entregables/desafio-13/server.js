const { options } = require('./options/options')

const { httpServer, socketIo } = require('./socketio')

const PORT = options.PORT

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (options.MODE == 'CLUSTER' && cluster.isPrimary) {

    console.log(`Master ${process.pid} started`);
    for (let i = 0; i < numCPUs / 4; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    })
} else {
    process.on('exit', code => {
        console.log('Error con codigo: ' + code);
    })

    try {
        httpServer.listen(PORT, () => {
            console.log(`Server Online on Port ${PORT}`)
            console.log(`Worker ${process.pid} started`);
        })
    } catch (error) {
        console.log(error);
    }
}

socketIo




