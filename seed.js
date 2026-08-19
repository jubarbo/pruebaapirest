import 'dotenv/config'
import prisma from './src/lib/prisma.js'
import bcrypt from 'bcrypt'

const run = async () => {
    const hashedPassword = await bcrypt.hash('test1234', 10)

    const user = await prisma.user.create({
        data: {
            username: 'testuser',
            name: 'Usuario de Prueba',
            email: 'test@test.com',
            password: hashedPassword
        }
    })

    console.log('Usuario creado:', user)
    process.exit(0)
}

run()