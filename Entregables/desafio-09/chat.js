const { normalizedChatpost, denormalizedChatPost } = require('./utils/schemaNormalizr')
const util = require('util')
const fs = require('fs')
const db = './db/chatMsg.json'
// let chatMsg = require('./db/chatMsg')
// createDb()

function print(text = "", objeto) {
    console.log(text, util.inspect(objeto, false, 12, true))
}
class Chat {
    constructor(table) {
        this.table = table
        this.file = db
    }
    async getMsj() {
        try {
            return { normalizedChatpost }
        } catch (error) {
            console.log(error);
        }
    }

    async addMsj(newMsj) {
        const denormalized = denormalizedChatPost(newMsj)
        try {
            fs.writeFile(this.file, JSON.stringify(denormalized, "", 2), error => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Datos Guardados")
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { Chat }
