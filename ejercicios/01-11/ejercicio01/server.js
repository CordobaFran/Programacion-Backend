const express = require('express')
const app = express()


const data = {
    nombre:'',
    apellido:'',
    color:''
}

app.get('/test', (req,res) => {
    res.status(200).json(data)
})

app.listen(8080, ()=>{
    console.log('servidor on');
})