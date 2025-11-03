import { IApplicationService } from "src/core/service/application-service.interface";
import { Result } from "src/core/result-handler/result";
import { randomUUID } from 'crypto';
import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../model/user";
import { BcryptService } from "src/core/bcrypt/bcrypt.service";
import { LoginServiceEntryDto } from "../dto/entry/login-entry.dto";
import { LoginServiceResponseDto } from "../dto/response/login-response.dto";
import { JwtService } from '../../auth/jwt/jwt.service';

export class LoginUserService implements IApplicationService<LoginServiceEntryDto, LoginServiceResponseDto> {

    constructor(
        private readonly userRepository: IUserRepository
    ){}

    async execute(data: LoginServiceEntryDto): Promise<Result<LoginServiceResponseDto>> {

        const result = await this.userRepository.findUserByEmail(data.email);

        if (!result.isSuccess()) {
            return Result.fail<LoginServiceResponseDto>(new Error('Wrong credentials'), 401, 'Wrong credentials');
        }

        if(!await new BcryptService().compare(data.password, result.Value.Password)) {
            return Result.fail<LoginServiceResponseDto>(new Error('Wrong credentials'), 401, 'Wrong credentials');
        }

        const payload = { email: data.email, userId: result.Value.Id };
        const token = await new JwtService().generateToken(payload);

        const response: LoginServiceResponseDto = {
            user: {
                id: result.Value.Id,
                username: result.Value.Username,
                email: result.Value.Email
            },
            token: token
        }

        return Result.success<LoginServiceResponseDto>(response, 201);
    }
}