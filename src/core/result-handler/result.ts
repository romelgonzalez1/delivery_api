import { BadRequestException } from "@nestjs/common"


export class Result<T>
{
    private value: T | null
    private error: Error | null
    private statusCode: number | null
    private message: string | null

    private constructor ( value: T | null, error: Error | null, statusCode: number | null, message: string | null )
    {
        this.value = value
        this.error = error
        this.statusCode = statusCode
        this.message = message
    }

    isSuccess (): boolean
    {
        // Consider value present when it's not null/undefined (allows 0, empty string, false)
        return this.value !== null && this.value !== undefined
    }

    get Value (): T
    {
        if ( this.isSuccess() )
            return this.value as T
        throw new BadRequestException( 'The value does not exist' )
    }

    get Error (): Error
    {
        if ( this.error )
            return this.error
        throw new BadRequestException( 'The error does not exist' )
    }

    get StatusCode (): number | null
    {
        return this.statusCode
    }

    get Message (): string
    {
        if ( this.message )
            return this.message
        throw new BadRequestException( 'The message does not exist' )
    }

    static success<T> ( value: T, statusCode: number ): Result<T>
    {
        return new Result<T>( value, null, statusCode, null )
    }

    static fail<T> ( error: Error, errorCode: number, message: string ): Result<T>
    {
        return new Result<T>( null, error, errorCode, message )
    }
}