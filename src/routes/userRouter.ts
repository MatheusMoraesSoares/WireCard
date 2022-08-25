import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import express from 'express'

const userController = new UserController(
    new UserBusiness(
        new UserDatabase()
    )
)

export const userRouter = express.Router()

userRouter.post('/signup', userController.signUp)
userRouter.post('/login', userController.login)