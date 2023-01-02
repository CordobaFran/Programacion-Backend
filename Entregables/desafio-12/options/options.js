const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
    .default({
        port: 8080
    })
    .alias({
        p: "port"
    })
    .argv

require('dotenv').config()

const options = {
    PORT: args.port,
    SECRETKEY_SESSION: process.env.SECRETKEY_SESSION,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    GITHUB_STRATEGY:  {
        clientID: process.env.GH_CLIENT_ID,
        clientSecret: process.env.GH_CLIENT_SECRET,
        callbackURL: process.env.GH_CALLBACK_CLIENT
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1' ,
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE_CONNECTION_PATH,
        },
        userNullAsDefault: true
    },
    mongoDb: {
        connection: process.env.MONGODB_CONNECTION_URL,
    },
    configAtlasSession : {
        mongoUrl: process.env.MONGOATLAS_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }
}

module.exports = {
    options
}