import { Request, Response } from "express"
import { CardBusiness } from "../business/CardBusiness"
import { InvalidInputError } from "../business/errors/InvalidInputError"
import { Authenticator } from "../services/Authenticator"
import { CardInputDTO } from "../types/CardInputDTO"

export class CardController {
    constructor(
        private cardBusiness: CardBusiness
    ){}

    newCard = async (req: Request, res: Response) => {
        try {
            const { name, number, expiration, cvv } = req.body
            const token = req.headers.authorization as string

            const user = Authenticator.getTokenData(token)

            if(!user) {
                throw new InvalidInputError("You must be logged in to perform this action")
            }

            const newCard: CardInputDTO = { name, number, expiration, cvv }

            await this.cardBusiness.newCard(newCard, user.id)

            res.status(201).send({ message: `Card inserted successfully.`})
            
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }

    }
}