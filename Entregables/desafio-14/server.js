const { options } = require('./options/options')

const { httpServer, socketIo } = require('./socketio')

const logger = require('./log')

const PORT = options.PORT

const cluster = require('cluster')
const numCPUs = require('os').cpus().length



if (options.MODE == 'CLUSTER' && cluster.isPrimary) {

    logger.log('verbose',`Master ${process.pid} started`);
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
            logger.log('error',`Server Online on Port ${PORT}`)
            logger.log('verbose', `Worker ${process.pid} started`);
        })
    } catch (error) {
        console.log(error);
    }
}

socketIo



