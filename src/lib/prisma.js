<<<<<<< HEAD
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;

=======
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
>>>>>>> 7f60b8b (Agregar Prisma, modelo User y endpoints CRUD de usuarios)
