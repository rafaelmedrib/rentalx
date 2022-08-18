import { getRepository, Repository } from "typeorm";

import { IUserTokensDTO } from "@modules/accounts/dtos/IUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expiration_date,
    refresh_token,
    user_id,
  }: IUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiration_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
