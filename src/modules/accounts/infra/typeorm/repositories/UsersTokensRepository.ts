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

  async findByUserIdAndByRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ user_id, refresh_token });
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userTokens = await this.repository.findOne({ refresh_token });
    return userTokens;
  }
}

export { UsersTokensRepository };
