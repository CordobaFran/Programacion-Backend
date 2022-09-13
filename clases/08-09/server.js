
const express = require('express')

const app = express()
let visitas = 0

app.get('/', (req, res) => {
    res.send("<h1>Bienvenido al servidor Express</h1>")
})

app.get('/visitas', (req, res) => {
    visitas++

    res.send(`<h2>La cantidad de visitas es: ${visitas} </h2> `)
    console.log(express());
})


const port = 4000

const server = app.listen(port, ()=>{
    console.log("listening on port", server.address().port);
})

server.on('error', (err) => console.log(err))

