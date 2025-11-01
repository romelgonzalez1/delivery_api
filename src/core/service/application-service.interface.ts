import { Result } from "../../core/result-handler/result"

export interface IApplicationService<D, R>
{
    execute ( data: D ): Promise<Result<R>>
}