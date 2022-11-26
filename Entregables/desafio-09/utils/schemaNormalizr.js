const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

const chatMsjs= require("../db/chatMsg")
const util = require('util')

function print(text = "", objeto) {
    console.log(text, util.inspect(objeto, false, 12, true))
}

const user = new schema.Entity('users')
const message = new schema.Entity('messages')
const comment = new schema.Entity('comments', {
    author: user,
    messages: message
})
const article = new schema.Entity('articles', {
    author: user,
    messages: [comment]
})
const post = new schema.Entity('posts', {
    posts: [article]
})


const normalizedChatpost = normalize(chatMsjs, post)
const denormalizedChatPost = denormalize(normalizedChatpost.result, post, normalizedChatpost.entities)

print("NORMALIZADO", normalizedChatpost);
// print("DENORMALIZADO", denormalizedChatPost);


module.exports = { normalizedChatpost, denormalizedChatPost, post }
