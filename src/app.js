
import cardRoutes from './routes/card.routes.js'
import userRoutes from './routes/user.routes.js'
import express from "express"
const app = express()

app.use(express.json())

const msj = { message: 'Bienvenido a la API de pruebas' }

app.get('/api', (req, res) => {
    res.json(msj)
})

app.use('/api/cards', cardRoutes)
app.use('/api/users', userRoutes)

export default app
