import { Card } from "../model/Card";
import { BaseDatabase } from "./BaseDataBase";

export class CardDatabase extends BaseDatabase {
    private static TABLE = 'card'

    newCard = async (newCard: Card) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    id: newCard.getId(),
                    name: newCard.getName(),
                    number: newCard.getNumber(),
                    date: newCard.getExpiration(),
                    cvv: newCard.getCvv(),
                    user_id: newCard.getUserId()
                })
                .into(CardDatabase.TABLE)
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}