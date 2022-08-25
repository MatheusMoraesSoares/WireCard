import { CardBusiness } from "../business/CardBusiness";
import { CardController } from "../controller/CardController";
import { CardDatabase } from "../data/CardDatabase";
import express from 'express'

const cardController = new CardController(
    new CardBusiness(
        new CardDatabase()
    )
)

export const cardRouter = express.Router()

cardRouter.post('/cadastrar', cardController.newCard)