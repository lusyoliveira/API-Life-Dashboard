import express from 'express'

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', (req,res) => {

    users.push(req.body)

    res.status(201) .json(req.body)
})

app.get('/usuarios', (req,res) => {
    res.status(200) .json(users)
})

app.listen(3000)

//subir servidor node server.js
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor