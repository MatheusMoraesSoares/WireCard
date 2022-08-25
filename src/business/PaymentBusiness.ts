import { PaymentCardInputDTO } from "../types/PaymentCardInputDTO";
import { CustomError } from "./errors/CustomError";
import { InvalidInputError } from "./errors/InvalidInputError";

export class PaymentBusiness {
    constructor(

    ){}

    newPaymentCard = async(paymentCard: PaymentCardInputDTO) => {
        try {
            const { amount, cardNumber } = paymentCard

            if(!amount || !cardNumber) {
                throw new InvalidInputError("Invalid input. name, last name, email, password and participation are required")
            }

            //checar se os dados passados estao corretos(existem?)

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}