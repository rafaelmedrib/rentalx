import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Forgot password mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      dateProvider,
      usersTokensRepository,
      mailProvider
    );
  });

  it("should be able to send mail to user who forgot his e-mail", async () => {
    const spy = jest.spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "7704761",
      email: "uj@baohu.bd",
      name: "May Boyd",
      password: "secret",
    });

    await sendForgotPasswordMailUseCase.execute("uj@baohu.bd");

    expect(spy).toHaveBeenCalled();
  });

  it("should not be able to send an email to a non existing user", async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("pivfocsaf@kinup.ck");
    }).rejects.toEqual(new AppError("User not found"));
  });

  it("should be able to create a user token", async () => {
    const spy = jest.spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "223370",
      email: "ijo@pugdacop.gp",
      name: "Aiden Baldwin",
      password: "67200122",
    });

    await sendForgotPasswordMailUseCase.execute("ijo@pugdacop.gp");
    expect(spy).toHaveBeenCalled();
  });
});
