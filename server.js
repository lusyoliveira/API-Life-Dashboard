import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', async (req,res) => {

   await prisma.Usuarios.create({
        data: {
            codigo: req.body.codigo,
            email: req.body.email,
            nome: req.body.nome,
        }
   })

    res.status(201) .json(req.body)
});

app.get('/usuarios', async (req,res) => {
    let listaUsuarios = []

    if (req.query) {
        listaUsuarios = await prisma.Usuarios.findMany({
            where: {
                nome: req.query.nome
            }
        })
    } else {
        listaUsuarios = await prisma.Usuarios.findMany()
    }
});

app.put('/usuarios/:codigo', async (req,res) => {

   await prisma.Usuarios.update({
        where: {
            codigo: Number(req.params.codigo)
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
        }
   })

    res.status(201) .json(req.body)
});

app.delete('/usuarios/:codigo', async (req,res) => {

   await prisma.Usuarios.delete({
        where: {
            codigo: Number(req.params.codigo)
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
        }
   })

    res.status(200) .json({ message: 'Deletado com sucesso!'})
});


app.listen(3000)

//subir servidor node server.js
//localhost:3000/usuarios
//instalar extensão thunderclient
//para servidor crtl+c
//node --watch server.js reiniciar servidor
//sa - 233wAisNSKpjM6E1
//# DATABASE_URL="prisma+postgres://localhost:51213/?api_key=eyJkYXRhYmFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zdGdyZXNAbG9jYWxob3N0OjUxMjE0L3RlbXBsYXRlMT9zc2xtb2RlPWRpc2FibGUmY29ubmVjdGlvbl9saW1pdD0xJmNvbm5lY3RfdGltZW91dD0wJm1heF9pZGxlX2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbWVvdXQ9MCZzaW5nbGVfdXNlX2Nvbm5lY3Rpb25zPXRydWUmc29ja2V0X3RpbWVvdXQ9MCIsIm5hbWUiOiJkZWZhdWx0Iiwic2hhZG93RGF0YWJhc2VVcmwiOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQGxvY2FsaG9zdDo1MTIxNS90ZW1wbGF0ZTE_c3NsbW9kZT1kaXNhYmxlJmNvbm5lY3Rpb25fbGltaXQ9MSZjb25uZWN0X3RpbWVvdXQ9MCZtYXhfaWRsZV9jb25uZWN0aW9uX2xpZmV0aW1lPTAmcG9vbF90aW1lb3V0PTAmc2luZ2xlX3VzZV9jb25uZWN0aW9ucz10cnVlJnNvY2tldF90aW1lb3V0PTAifQ"
