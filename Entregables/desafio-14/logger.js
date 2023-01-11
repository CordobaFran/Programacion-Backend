const winston = require('winston')

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'log_warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'log_error.log', level: 'error' }),
    ]
})

module.exports = logger