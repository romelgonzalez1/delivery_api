import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query, Res } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoginUserService } from 'src/user/services/login-user';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from 'src/user/repository/postgres/user.repository';
import { IUserRepository } from 'src/user/repository/IUserRepository';
import { CreateUserService } from 'src/user/services/create-user';
import { RegisterDto } from '../dto/register.dto';
import type { Response } from 'express';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    private readonly userRepository: IUserRepository;

    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
        this.userRepository = new UserRepository(this.dataSource)
    }

    // @UseGuards(JwtAuthGuard)
    @Post('/login')
    async login(@Body(new ValidationPipe({ transform: true })) body: LoginDto, @Res() res: Response) {
        const service = new LoginUserService(this.userRepository);
        const result = await service.execute(body);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, statusCode: result.StatusCode, message: result.Message });
        }

        return res.status(result.StatusCode ?? 200).json(result.Value);
    }

    @Post('/register')
    async register(@Body() createUserDto: RegisterDto, @Res() res: Response) {
        const service = new CreateUserService(this.userRepository);
        const result = await service.execute(createUserDto);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode ?? 500).json({ error: result.Error?.message, statusCode: result.StatusCode, message: result.Message });
        }

        return res.status(result.StatusCode ?? 201).json(result.Value);
    }
}