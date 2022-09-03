import { IUserTokensDTO } from "../dtos/IUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({
    expiration_date,
    refresh_token,
    user_id,
  }: IUserTokensDTO): Promise<UserTokens>;

  findByUserIdAndByRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token): Promise<UserTokens>;
}

export { IUsersTokensRepository };
