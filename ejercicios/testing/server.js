const { Router } = require('express')
const express = require('express')
const multer = require('multer')

const router = Router()

const app = express()

app.use(express.static("public"))

let storage = multer.memoryStorage()

const upload = multer({
    storage: storage
})


app.post('/upload', upload.single('myFile'), (req, res) => {
    console.log(req.file);
    try {
        res.send('ok')
    } catch (error) {
        console.log(error);
    }
})


app.listen(8080, () => {
    console.log('servidor http conectado en el puerto');
})