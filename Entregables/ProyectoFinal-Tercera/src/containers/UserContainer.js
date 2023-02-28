const mongoose = require('mongoose')
const { options } = require('../../../desafio-09/options/connectOptions')
const { UsersModel } = require("../models/users")
const { isValidPassword } = require('../middleware/passport.middleware')
const { loggerError, loggerConsole } = require('../../logger')

// createDb()
module.exports = class Container {
    constructor() {
        this.Model = UsersModel
        if (mongoose.connection.readyState === 0) {
            return this.connect()
        }
    }

    connect() {
        try {
            mongoose.connect(options.mongoDb.connection, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            loggerConsole.info('Mongo db User connected');
        } catch (error) {
            loggerError.error(error);
        }
    }

    async createUser(userAdded) {
        try {
            const newUser = new this.Model(userAdded)
            await newUser.save()
            return { status: "User added" }
        } catch (error) {
            loggerError.error(error);
        }
    }

    async findUserAndEmail(username, email) {
        try {
            return await this.Model.findOne(
                {
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                }
            )
        } catch (error) {
            loggerError.error(error);
        }
    }

    async validUserAndPass(user, pass) {
        try {
            const userExists = await this.Model.findOne({username: user})    

            if (userExists && isValidPassword(userExists, pass)) {
                return userExists._doc
            }

        } catch (error) {
            loggerError.error(error);
        }
    }
}