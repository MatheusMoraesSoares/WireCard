import { User } from "../model/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase {
    private static TABLE = "user"

    insertUser = async (newUser: User) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    id: newUser.getId(),
                    name: newUser.getName(),
                    email: newUser.getEmail(),
                    cpf: newUser.getCpf(),
                    password: newUser.getPassword()
                })
                .into(UserDatabase.TABLE)
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const result = await BaseDatabase.connection()
                .select("*")
                .from(UserDatabase.TABLE)
                .where({ email })

            return result[0] && User.toUserModel(result[0])

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}