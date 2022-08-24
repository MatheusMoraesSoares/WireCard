import { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManage } from "../services/HashManage";
import IdGenerator from "../services/IdGenerator";
import { LoginInputDTO } from "../types/LoginInputDTO";
import { SignupInputDTO } from "../types/SignupInputDTO";
import { CustomError } from "./errors/CustomError";
import { InvalidInputError } from "./errors/InvalidInputError";
import { NotFoundError } from "./errors/NotFoundError";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ){}

    signUp = async (user: SignupInputDTO) => {
        const { name, email, cpf, password } = user

        if(!name || !email || !cpf || !password ) {
            throw new InvalidInputError("Invalid input. name, last name, email, password and participation are required")
        }

        if (password.length < 6) {
            throw new InvalidInputError("Invalid password. Password must have at least 6 characters")
        }

        if (email.includes("@") === false) {
            throw new InvalidInputError("Invalid email. Email must contain @")
        }

        if(cpf.length != 11) {
            throw new CustomError(500, "Cpf must have 11 characters")
        }

        const registeredUser = await this.userDatabase.getUserByEmail(email)

        if(registeredUser) {
            throw new NotFoundError("User already exists")
        }

        const id = IdGenerator.idGenerator()
        const cryptedPassword = await HashManage.generateHash(password)

        const newUser = new User(id, name, email, cpf, cryptedPassword)

        await this.userDatabase.insertUser(newUser)

        const token = Authenticator.generateToken({ id })

        return token
    }

    login = async (user: LoginInputDTO) => {
        const { email, password } = user

        if (!email || !password) {
            throw new InvalidInputError("Invalid input. Email and password are required")
        }
        
        const userFromDB = await this.userDatabase.getUserByEmail(email)
        
        if (!userFromDB) {
            throw new NotFoundError("Invalid credentials: email.")
        }

        const isPasswordCorrect: boolean = await HashManage.compare(password, userFromDB.getPassword())
        
        if(!isPasswordCorrect) {
            throw new NotFoundError("Invalid credentials: password")
        }

        const token = Authenticator.generateToken({
            id: userFromDB.getId()
        })

        return token
    }
}