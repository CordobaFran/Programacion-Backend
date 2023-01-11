const logger = require("../../logger")

function logUrlInfo(req, res, next) {
    logger.info(`URL: ${req.url}, METHOD: ${req.method}`)
    next()
}

function logUrlWarn(req, res, next) {
    logger.warn(`URL: ${req.url}, METHOD: ${req.method}`)
    next()
}

module.exports = {
    logUrlInfo,
    logUrlWarn
}

