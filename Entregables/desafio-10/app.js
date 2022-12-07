const options = require('./options/connectOptions.js').options
const { authMiddleware } = require('./src/middleware/auth.middleware')

const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const handlebars = require('express-handlebars')

const routerProducts = require('./src/routes/apiMock/apiMock.routes')
const mainProducts = require('./src/routes/productos/main.routes.js')
const routerLogin = require('./src/routes/login/login.routes')

require('dotenv').config()

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)

app.set('view engine', 'hbs');
app.set('views', './views')

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create(options.configAtlasSession),
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge: 1000 * 60 * 10
    }
}))

app.use('/api', routerProducts)
app.use('/login', routerLogin)
app.use('/', authMiddleware, mainProducts)

module.exports = app