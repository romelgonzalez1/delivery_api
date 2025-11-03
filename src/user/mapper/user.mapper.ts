import { User } from "../model/user";
import { UserEntity } from "../model/entity/user.entity";
import { IMapper } from "src/core/mapper/mapper.interface";

export class UserMapper implements IMapper<User, UserEntity> {
    async fromDomainToPersistence(domain: User): Promise<UserEntity> {

        const userORM = new UserEntity();

        userORM.id = domain.Id;
        userORM.username = domain.Username;
        userORM.email = domain.Email;
        userORM.password = domain.Password;

        return userORM;
    }

    async fromPersistenceToDomain(persistence: UserEntity): Promise<User> {

        const user = new User(
            persistence.id,
            persistence.username,
            persistence.email,
            persistence.password,
        );

        return user;
    }
}
