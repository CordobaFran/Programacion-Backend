const http = require('http')
const express = require('express')
const app = express()


const server = http .createServer((peticion, respuesta) => {
    respuesta.end("hola mundo")
})

const connectedServer = server.listen(8080, ()=>{
    console.log('servidor http conectado en el puerto', connectedServer.address().port);
})

const mensajeHora = ()=>{
    const time = Date.now()
    console.log(time);
}

app.get('/api/frase', (req,res) => {
    res.status(200).json("hola mundo como estan")
})

mensajeHora()