import { verifyAccessToken } from '../lib/jwt.js'

export const requireAuth = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ error: 'No autorizado' })
    }

    try {
        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido o vencido' })
    }
}