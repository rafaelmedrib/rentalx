import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expiration_date = this.dateProvider.addDays(
      expires_in_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expiration_date: refresh_token_expiration_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
