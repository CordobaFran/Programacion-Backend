const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

const authorSchema = new schema.Entity('authors')

const commentShema = new schema.Entity('comments')

const postSchema = new schema.Entity('posts', {
    author: authorSchema,
    comments: [commentShema]
})


const normalizedChatpost = normalize(chat, postSchema)

const denormalizedChatPost = denormalize(normalizedChatpost.result, postSchema, normalizedChatpost.entities)

module.exports = {normalizedChatpost, denormalizedChatPost}
