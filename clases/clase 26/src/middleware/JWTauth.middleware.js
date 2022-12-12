const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        
        return res.status(401).json({
            error: 'not authenticated'
        })
    }

    const token = authHeader

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: ' not authorized'
            })
        }

        req.user = decoded.data
        next()
    })
}

module.exports = {
    auth
}