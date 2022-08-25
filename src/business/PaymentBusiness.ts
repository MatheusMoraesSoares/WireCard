import { PaymentDatabase } from "../data/PaymentDatabase";
import { PaymentCardInputDTO } from "../types/PaymentCardInputDTO";
import { CustomError } from "./errors/CustomError";
import { InvalidInputError } from "./errors/InvalidInputError";
import { NotFoundError } from "./errors/NotFoundError";

export class PaymentBusiness {
    constructor(
        private paymentDatabase: PaymentDatabase
    ){}

    newPaymentCard = async(paymentCard: PaymentCardInputDTO) => {
        try {

            if(!paymentCard.amount || !paymentCard.cardNumber) {
                throw new InvalidInputError("Invalid input. amount and card number are required")
            }
            
            const cardId: any = await this.paymentDatabase.getCardByNumber(paymentCard.cardNumber)//agora tem que pegar o cartao do usuario certo(nao esqueça que tem como pegar o id do usuario logado usando seu token)

            if(!cardId) {
                throw new NotFoundError("Card number not yet inserted.")
            }
            
            await this.paymentDatabase.newPaymentCard(paymentCard, cardId)
            
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}