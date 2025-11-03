import { GetUserResponseDto } from './get-user-response.dto'

export interface LoginServiceResponseDto {
    user: GetUserResponseDto
    token: string
}