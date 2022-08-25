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
                .where({cardNumber})
            
            return result
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    newPaymentCard = async(paymentCard: PaymentCardInputDTO, cardId: string) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    amount: paymentCard.amount,
                    cardNumber: paymentCard.cardNumber,
                    cardId
                })
                .into(PaymentDatabase.TABLE)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}