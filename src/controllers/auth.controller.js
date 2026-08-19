import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt.js'

const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000 // 15 minutos
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    path: '/api/auth/refresh'
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        const payload = { id: user.id, email: user.email, role: user.role }

        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        res.cookie('accessToken', accessToken, accessCookieOptions)
        res.cookie('refreshToken', refreshToken, refreshCookieOptions)

        res.json({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({ error: 'No autorizado' })
        }

        const decoded = verifyRefreshToken(token)
        const payload = { id: decoded.id, email: decoded.email, role: decoded.role }
        const newAccessToken = generateAccessToken(payload)

        res.cookie('accessToken', newAccessToken, accessCookieOptions)

        res.json({ message: 'Token renovado' })
    } catch (error) {
        return res.status(401).json({ error: 'Refresh token invalido o vencido' })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/api/auth/refresh' })
    res.json({ message: 'Sesion cerrada' })
}