import { Router } from 'express'
import * as userController from "../controllers/user.controller.js"

const router = Router()

router.get('/', userController.getUsers)

router.post('/', userController.postUser)

export default router

