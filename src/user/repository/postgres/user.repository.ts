import { IUserRepository } from "../IUserRepository";
import { UserEntity as UserORM } from "src/user/model/entity/user.entity";
import { Result } from "src/core/result-handler/result";
import { User } from "src/user/model/user";
import { DataSource, Repository } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { UserMapper } from "src/user/mapper/user.mapper";

export class UserRepository extends Repository<UserORM> implements IUserRepository {

    private readonly userMapper: UserMapper;

    constructor(datasource: DataSource) {
        super(UserORM, datasource.createEntityManager());
        this.userMapper = new UserMapper();
    }

    async findUserByEmail(email: string): Promise<Result<User>> {
        try {
            const user = await this.createQueryBuilder('user')
                .where('user.email = :email', { email })
                .getOne();

            if (!user) {
                return Result.fail<User>(new Error('User not found'), 404, 'User not found');
            }

            const userDomain = await this.userMapper.fromPersistenceToDomain(user);

            return Result.success<User>(userDomain, 200);
        } catch (error) {
            return Result.fail<User>(new Error(`Error finding user by email: ${error.message}`), 500, 'Internal Server Error');
        }
    
    }

    async saveUser(user: User): Promise<Result<User>> {
        try {
            const userORM = await this.userMapper.fromDomainToPersistence(user);
            const savedUser = await this.save(userORM);
            const userDomain = await this.userMapper.fromPersistenceToDomain(savedUser);
            return Result.success<User>(userDomain, 201);
        } catch (error) {
            return Result.fail<User>(new Error(`Error saving user: ${error.message}`), 500, 'Internal Server Error');
        }
    }
}
