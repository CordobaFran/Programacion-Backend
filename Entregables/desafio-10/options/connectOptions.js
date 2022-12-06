require('dotenv').config()

const options = {
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: "./DB/ecommerce.sqlite"
        },
        userNullAsDefault: true
    },
    mongoDb: {
        connection: "mongodb+srv://FrancoCordoba:Franco8492@cluster0.7lls3u0.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    configAtlasSession : {
        mongoUrl: process.env.mongoAtlas_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}
    }
}

module.exports = {
    options
}