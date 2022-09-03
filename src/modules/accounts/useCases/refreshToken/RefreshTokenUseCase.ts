import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndByRefreshToken(
        sub,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exist");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expiration_date = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    );

    await this.usersTokensRepository.create({
      refresh_token,
      user_id: sub,
      expiration_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
