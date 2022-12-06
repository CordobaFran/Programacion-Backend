const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//const FileStore = require('session-file-store')(session)

// const redis = require('redis')
// const client = redis.createClient()
// const RedisStore = require('connect-redis')(session)

const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}


const cookiesRoutes = require('./src/routes/cookies/cookies.routes.js')
const sessionRoutes = require('./src/routes/session/session.routes.js')
require('dotenv').config()

const app = express()

// const store = {
//         path: './src/session',
//         ttl: 60 * 60 * 24 * 7, //1 week, 
//         retries: 0
//     }
    
// const storeRedis = {
//     host: 'localhost',
//     port: 6379,
//     client: client,
//     ttl: 60 * 3600 * 24 * 168
// }

//mongo local
// const configMongo = {
//     mongoUrl: 'mongodb://localhost:27017/sessions'
// }

//mongo Atlas
const configAtlas = {
    mongoUrl: process.env.mongoAtlas_URL,
    mongoOptions: advancedOptions
}

app.use(session({
    secret: 'palabraSecreta',
    store: MongoStore.create(configAtlas),
    // store: new RedisStore(storeRedis),
    // store: new FileStore(store),

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