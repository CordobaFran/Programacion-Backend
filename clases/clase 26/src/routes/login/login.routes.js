const { Router } = require('express')
const passport = require('passport')
const router = Router()

router.get("/login", async (req, res) => {
    res.render('login')
})

router.post("/login", passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/githubcallback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

// router.post('/login', (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = users.find(user => user.username === username)

//         if(!user){
//             return res.status(401).send('Usuario no existente')
//         }

//         if(user.password !== password) {
//             return res.status(401).send('password erroneo')
//         }

//         req.session.user = username
//         req.session.admin = true
//         res.status(200).redirect('/')

//     } catch (error) {
//         console.log(error);
//     }
// })

router.get("/signup", async (req, res) => {
    res.render('signup')
})

router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup'
}))


router.get("/logout", async (req, res) => {
    const username = req.session.user;
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
    res.render('logout', { username })
})


module.exports = router