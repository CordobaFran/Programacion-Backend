const { Router } = require('express')
const passport = require('passport')
const { users } = require('../../../db/users')
const { generateToken } = require('../../middleware/JWTgenerate.middleware')
const { createHash } = require('../../middleware/passport.middleware')
const router = Router()
const userContainer = require('../../../containers/UserContainer')
const UserContainer = new userContainer()
//------------------------------LOGIN------------------------------//

router.get("/login", async (req, res) => {
    // console.log(req.header('authorization'));
    res.clearCookie('authorization')
    res.render('login')
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const loginSuccessUser = await UserContainer.validUserAndPass(username, password)

    if (!loginSuccessUser) {
        // return res.json({ error: "Credenciales invalidas" })
        const error = `
        <div style="margin: 20px">
            <h1> Invalid username or password</h1>
            <a href="javascript:window.history.back()"> Back to Login</a>
        </div>
        `
        return res.send(error)
    }

    const { password: pass, ...userWithoutPass } = loginSuccessUser
    const access_token = generateToken(userWithoutPass)

    // res.header('authorization', [access_token]).json({ access_token })
    res.cookie("authorization", access_token)
    res.status(200).redirect('/')
})

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/auth/login'
}),
function(req, res) {
    const access_token = generateToken(req.user)
    res.status(201).cookie("authorization", access_token).redirect('/')
})

//------------------------------REGISTER------------------------------//

router.get("/register", async (req, res) => {
    res.render('register')
})

router.post("/register", async (req, res) => {
    const { username, password, email, admin } = req.body

    const userExists = await UserContainer.findUserAndEmail(username, email)

    if (userExists) {
        // return res.status(301).json({ error: "user or email exists" })
        const error = `
        <div style="margin: 20px">
            <h1>username or e-mail exists</h1>
            <p>Use other username or e-mail</p>
            <a href="javascript:window.history.back()"> Back to Register</a>
        </div>
        `
        return res.send(error) 
        // res.end()
    }
    
    const newUser = {
        username,
        email,
        password: createHash(password),
        admin
    }

    UserContainer.createUser(newUser)

    const access_token = generateToken(newUser)
    res.redirect('/auth/login')
    // res.json({ access_token })
})

//------------------------------LOGOUT------------------------------//

router.get("/logout", async (req, res) => {
    res.clearCookie("authorization")
    res.render('logout')
})

module.exports = router


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

// router.post("/register", passport.authenticate('register', {
//     successRedirect: '/auth/login',
//     failureRedirect: '/auth/register'
// }))

