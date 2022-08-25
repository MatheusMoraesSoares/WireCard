import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentCardInputDTO } from "../types/PaymentCardInputDTO";

export class PaymentController {
    constructor(
        private paymentBusiness: PaymentBusiness
    ){}

    newPaymentCard = async(req: Request, res: Response) => {
        try {
            const { amount, cardNumber } = req.body

            const paymentCard: PaymentCardInputDTO = { amount, cardNumber }

            await this.paymentBusiness.newPaymentCard(paymentCard)

            res.status(201).send({ message: "Sucessfull transation." })
            
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}