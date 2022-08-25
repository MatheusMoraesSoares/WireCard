import { CardDatabase } from "../data/CardDatabase";
import { Card } from "../model/Card";
import IdGenerator from "../services/IdGenerator";
import { CardInputDTO } from "../types/CardInputDTO";
import { InvalidInputError } from "./errors/InvalidInputError";

export class CardBusiness {
    constructor(
        private cardDatabase: CardDatabase
    ){}

    newCard = async (card: CardInputDTO, userId: string) => {
        try {
            const { name, number, expiration, cvv } = card

        if(!name || !number || !expiration || !cvv) {
            throw new InvalidInputError("Invalid input. name, number, expiration date, and cvv are required")
        }

        const id = IdGenerator.idGenerator()
        const newCard = new Card ( id, name, number, expiration, cvv, userId )

        await this.cardDatabase.newCard(newCard)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }
}