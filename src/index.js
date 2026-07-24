
import app from './app.js'
import { config } from './config.js'

app.listen(config.port, function () {
    console.log(`Escuchando en http://localhost:${config.port}`)
})




