const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const cookiesRoutes = require('./src/routes/cookies/cookies.routes.js')
const sessionRoutes = require('./src/session/session.routes.js')
require('dotenv').config()

const app = express()


app.use(session({
    secret: 'palabraSecreta',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/cookies', cookiesRoutes)
app.use('/session', sessionRoutes)

module.exports = app