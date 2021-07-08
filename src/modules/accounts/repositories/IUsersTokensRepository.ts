import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";




interface IUsersTokensRepository {

    create({user_id,refresh_token,expires_dates}: ICreateUserTokenDTO): Promise<UserTokens>

}


export { IUsersTokensRepository}