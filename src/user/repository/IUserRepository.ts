import { Result } from "src/core/result-handler/result";
import { User } from "../model/user";

export interface IUserRepository {
    findUserByEmail(email: string): Promise<Result<User>>;
    saveUser(user: User): Promise<Result<User>>;
}