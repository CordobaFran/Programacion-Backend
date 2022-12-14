const express = require('express')
const app = express()

const Contenedor = require('./Container')
const PORT = 8080

const productos= new Contenedor ('productos.txt')

app.get('/', (req, res)=>{
    res.send('Hola')
    console.log(productos.read())
})


app.get('/productos', (req, res)=>{
    res.json(productos.getAll())
})

app.get('/productoRandom', (req, res)=>{
    res.json(productos.getRandomProduct())
})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})