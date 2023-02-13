const {loggerConsole, loggerWarn} = require("../../logger")

function logUrlInfo(req, res, next) {
    loggerConsole.info(`URL: ${req.url}, METHOD: ${req.method}`)
    next()
}

function logUrlWarn(req, res, next) {
    loggerWarn.warn(`URL: ${req.url}, METHOD: ${req.method}`)
    next()
}

module.exports = {
    logUrlInfo,
    logUrlWarn
}

