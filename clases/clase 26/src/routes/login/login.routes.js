const { Router } = require('express')
const passport = require('passport')
const { users } = require('../../../db/users')
const { generateToken } = require('../../middleware/JWTgenerate.middleware')
const router = Router()

//------------------------------LOGIN------------------------------//

router.get("/login", async (req, res) => {
    res.render('login')
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username == username && user.password == password)
    if (!user) {
        return res.json({ error: "Credenciales invalidas" })
    }
 
    const { password:pass, ...userWithoutPass  } = user
    const access_token = generateToken(userWithoutPass)
    res.json({ access_token })
})

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/githubcallback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

//------------------------------REGISTER------------------------------//

router.get("/signup", async (req, res) => {
    res.render('signup')
})

router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup'
}))

//------------------------------LOGOUT------------------------------//

router.get("/logout", async (req, res) => {
    const username = req.session.user;
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
    })
    res.render('logout', { username })
})

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



module.exports = router