import { Card } from "../model/Card";
import { BaseDatabase } from "./BaseDataBase";

export class CardDatabase extends BaseDatabase {
    private static TABLE = 'card_info'

    newCard = async (newCard: Card) => {
        try {
            return await BaseDatabase.connection()
                .insert({
                    id: newCard.getId(),
                    name: newCard.getName(),
                    number: newCard.getNumber(),
                    expiration: newCard.getExpiration(),
                    cvv: newCard.getCvv(),
                    userId: newCard.getUserId()
                })
                .into(CardDatabase.TABLE)
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}