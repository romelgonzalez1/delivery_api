import { IApplicationService } from "src/core/service/application-service.interface";
import { Result } from "src/core/result-handler/result";
import { randomUUID } from 'crypto';
import { CreateUserServiceEntryDto } from "../dto/entry/create-user-entry.dto";
import { CreateUserServiceResponseDto } from "../dto/response/create-user-response.dto";
import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../model/user";
import { BcryptService } from "src/core/bcrypt/bcrypt.service";

export class CreateUserService implements IApplicationService<CreateUserServiceEntryDto, CreateUserServiceResponseDto> {

    constructor(
        private readonly userRepository: IUserRepository
    ){}

    async execute(data: CreateUserServiceEntryDto): Promise<Result<CreateUserServiceResponseDto>> {

        const result = await this.userRepository.findUserByEmail(data.email);

        if (result.isSuccess() && result.Value) {
            return Result.fail<CreateUserServiceResponseDto>(new Error('Email already in use'), 400, 'Email already in use');
        }

        data.password = await new BcryptService().hash(data.password);

        const domainUser = new User(
            randomUUID(), 
            data.email, 
            data.username, 
            data.password
        );

        const savedUser = await this.userRepository.saveUser(domainUser);

        if (!savedUser.isSuccess()) {
            return Result.fail(savedUser.Error, savedUser.StatusCode ?? 500, savedUser.Message);
        }

        const response: CreateUserServiceResponseDto = {
            id: savedUser.Value.Id!,
            username: savedUser.Value.Username!,
            email: savedUser.Value.Email!
        };

        return Result.success<CreateUserServiceResponseDto>(response, 201);
    }
}