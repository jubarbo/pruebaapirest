import cardRoutes from './routes/card.routes.js'
import express from "express"
const app = express()

const msj = { message: 'Bienvenido a la API de pruebas' }


app.get('/api', (req, res) => {
    res.json(msj)
})

app.use('/api/cards', cardRoutes)




export default app