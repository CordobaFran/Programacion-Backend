const { Router } = require('express')
const router = Router()

//middlewares
const { authMiddleware } = require('../../middleware/auth.middleware.js')


router.get('/', authMiddleware, (req, res) => {
    res.send('<h1>Bienvenido</h1>')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
    res.send('<h1>Logout Ok</h1>')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username !== 'franco' || password !== 'ppackkck') {
        console.log(username, password);
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.status(200).send('login success')
})

module.exports = router