
// const { serializeUser } = require('passport')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { users } = require('../../db/users')


function createHash(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10),
        null)
}

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password)
}

passport.use('login', new LocalStrategy(
    (username, password, done) => {

        let user = users.find(user => user.username === username)
        console.log(users);
        if (!user) {
            console.log(`User Not Found with username ${username}`);
            return done(null, false)
        }

        return done(null, user)
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {

        let user = users.find(user =>  user.username === username )
        console.log(user);
        if (user) {
            console.log(`User ${username} already exists`);
            return done(null, false, { message: 'user already exists' })
        }

        const { admin } = req.body
        var isTrueSet = (admin === 'true') //convierte el string de true and false en un boolean

        const newUser = {
            id: users.length + 1,
            username,
            password: createHash(password),
            admin: isTrueSet
        }

        users.push(newUser)

        return done(null, newUser)

    })
)

//nos guarda el id del usuario en la session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// toma el id que esta en las sessions
// si esta ok deja pasar al usuario y continuar con la auth
passport.deserializeUser((id, done) => {
    let user = users.find(user => user.id === id)
    done(null, user)
})

module.exports = { passport }