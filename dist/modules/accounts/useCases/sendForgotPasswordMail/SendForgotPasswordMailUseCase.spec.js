"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepository;
let usersTokensRepository;
let dateProvider;
let mailProvider;
describe("Forgot password mail", () => {
  beforeEach(() => {
    usersRepository = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepository = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepository, dateProvider, usersTokensRepository, mailProvider);
  });
  it("should be able to send mail to user who forgot his e-mail", async () => {
    const spy = jest.spyOn(mailProvider, "sendMail");
    await usersRepository.create({
      driver_license: "7704761",
      email: "uj@baohu.bd",
      name: "May Boyd",
      password: "secret"
    });
    await sendForgotPasswordMailUseCase.execute("uj@baohu.bd");
    expect(spy).toHaveBeenCalled();
  });
  it("should not be able to send an email to a non existing user", async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("pivfocsaf@kinup.ck");
    }).rejects.toEqual(new _AppError.AppError("User not found"));
  });
  it("should be able to create a user token", async () => {
    const spy = jest.spyOn(usersTokensRepository, "create");
    await usersRepository.create({
      driver_license: "223370",
      email: "ijo@pugdacop.gp",
      name: "Aiden Baldwin",
      password: "67200122"
    });
    await sendForgotPasswordMailUseCase.execute("ijo@pugdacop.gp");
    expect(spy).toHaveBeenCalled();
  });
});