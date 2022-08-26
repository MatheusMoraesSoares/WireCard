import { PaymentCardInputDTO } from "../types/PaymentCardInputDTO";
import { BaseDatabase } from "./BaseDataBase";

export class PaymentDatabase extends BaseDatabase {
    private static TABLE = 'payment'
    private static TABLE_CARD = 'card'

    getCardByNumber = async(cardNumber: string) => {
        try {
            const result: any = await BaseDatabase.connection()
                .select("*")
                .from(PaymentDatabase.TABLE_CARD)
                .where({number: cardNumber})
            
            return result[0]
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    newPaymentCard = async(paymentCard: PaymentCardInputDTO, cardId: string, id: string) => {
        try {
            console.log(cardId)
            await BaseDatabase.connection()
                .insert({
                    id,
                    amount: paymentCard.amount,
                    card_number: paymentCard.cardNumber,
                    card_id: cardId
                })
                .into(PaymentDatabase.TABLE)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}