import prisma from '../lib/prisma.js'

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await prisma.user.create({ data: { name, email, password } })
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password }
        })
        res.json(user)
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.user.delete({ where: { id: Number(id) } })
        res.status(204).send()
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
