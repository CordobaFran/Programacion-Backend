const { options } = require('./options/connectOptions')
const knex = require('knex')(options.sqlite)
const { normalizedChatpost, post } = require('./utils/schemaNormalizr')

// createDb()

class Chat {
    constructor(table) {
        this.table = table
    }
    async getMsj() {
        try {
            // console.log(JSON.parse(JSON.stringify(await knex.from(this.table).select('*'))));
            // return JSON.parse(JSON.stringify(await knex.from(this.table).select('*')));;
            return {normalizedChatpost, post}
        } catch (error) {
            console.log(error);
        }
    }

    async addMsj(newMsj) {
        try {
            return await knex.from(this.table).insert(newMsj)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { Chat }
