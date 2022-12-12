const mongoose = require('mongoose')
const { options } = require('../../desafio-09/options/connectOptions')
const { UsersModel } = require("../models/users")
const { isValidPassword } = require('../src/middleware/passport.middleware')

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
            console.log('Mongo db User connected');
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(userAdded) {
        // console.log(userAdded);
        try {
            const newUser = new this.Model(userAdded)
            await newUser.save()
            return { status: "User added" }
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

    async validUserAndPass(user, pass) {
        try {
            const userExists = await this.Model.findOne({username: user})    

            if (userExists && isValidPassword(userExists, pass)) {
                return userExists._doc
            }

        } catch (error) {
            console.log(error);
        }
    }
}