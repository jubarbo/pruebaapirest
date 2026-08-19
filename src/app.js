import cardRoutes from './routes/card.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import { requireAuth } from './middlewares/auth.middleware.js'
import express from "express"
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

const msj = { message: 'Bienvenido a la API de pruebas' }

app.get('/api', (req, res) => {
    res.json(msj)
})

app.use('/api/auth', authRoutes)

app.use('/api/cards', requireAuth, cardRoutes)
app.use('/api/users', requireAuth, userRoutes)

export default app