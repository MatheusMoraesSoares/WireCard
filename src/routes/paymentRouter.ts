import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentController } from "../controller/PaymentController";
import { PaymentDatabase } from "../data/PaymentDatabase";
import express from 'express'

const paymentController = new PaymentController(
    new PaymentBusiness(
        new PaymentDatabase()
    )
)

export const paymentRouter = express.Router()

paymentRouter.post('/card', paymentController.newPaymentCard)