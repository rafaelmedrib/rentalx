import { IUserTokensDTO } from "../dtos/IUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({
    expiration_date,
    refresh_token,
    user_id,
  }: IUserTokensDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
