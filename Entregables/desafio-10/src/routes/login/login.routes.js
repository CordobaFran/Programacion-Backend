const { Router } = require('express')
const router = Router()

router.get("/", async (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {


    const { username, password } = req.body
    // if (username !== 'admin' || password !== 'admin') {
    //     return res.send('login failed')
    // }
    req.session.user = username
    req.session.admin = true
    res.status(200).redirect('/')
})


module.exports = router