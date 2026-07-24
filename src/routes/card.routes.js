import { Router } from 'express'
import * as cardController from "../controllers/card.controller.js"

const router = Router()

router.get('/', cardController.getCards)


export default router