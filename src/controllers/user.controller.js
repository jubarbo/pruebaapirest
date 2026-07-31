
import prisma from "../lib/prisma.js";


export const getUsers = async (req, res) => {

    // res.json({ message: "Aqui los usuarios", fechaHoy: new Date() })

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        res.status(200).json(users);

    } catch (error) {
        console.error("Error obteniendo usuarios:", error);

        res.status(500).json({
            message: "Error interno del servidor",
        });
    }

}

export const postUser = async (req, res) => {

    try {

        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
        });

        res.status(201).json({ message: "Usuario creado con exito", user });
    } catch (error) {
        console.log("error es: ", error)
        res.status(500).json({
            message: "Error creando usuario",
        });
    }



    // res.json({ message: "Publica usuario los usuarios", fechaHoy: new Date(), datosEnviados })

}

