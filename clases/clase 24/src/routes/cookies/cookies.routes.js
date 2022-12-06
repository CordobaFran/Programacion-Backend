const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    const { cookies } = req

    res.status(200).json({ cookies })
})

router.get('/set', (req, res) => {
    res.cookie("nombre", "Franco")
    res.status(200).json({
        status: 'cookie created'
    })
})

router.get('/borrar', (req, res) => {
    res.clearCookie('nombre')
    res.status(200).json({
        status: 'cookie deleted'
    })
})

module.exports = router