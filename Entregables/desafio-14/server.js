const { options } = require('./options/options')

const { httpServer, socketIo } = require('./socketio')

const {loggerConsole, loggerError} = require('./logger')

const PORT = options.PORT

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

<<<<<<< HEAD
const compression = require('compression')
=======

>>>>>>> a962dbb43abfcdd2de1f07a6902c659a3bd48b6b

if (options.MODE == 'CLUSTER' && cluster.isPrimary) {

    loggerConsole.info(`Master ${process.pid} started`);
    for (let i = 0; i < numCPUs / 4; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        loggerConsole.info(`Worker ${worker.process.pid} died`);
    })
} else {
    process.on('exit', code => {
        loggerError.error('Error con codigo: ' + code);
    })

    try {
        httpServer.listen(PORT, () => {
            loggerConsole.info(`Server Online on Port ${PORT}`)
            loggerConsole.debug( `Worker ${process.pid} started`);
        })
    } catch (error) {
        loggerError.error(error);
    }
}

socketIo



