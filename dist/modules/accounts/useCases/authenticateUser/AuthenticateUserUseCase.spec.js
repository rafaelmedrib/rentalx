"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let createUserUseCase;
let usersRepository;
let usersTokensRepository;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepository = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepository, usersTokensRepository, dateProvider);
  });
  it("Should be able to authenticate an user", async () => {
    const user = {
      name: "Test",
      email: "user@test.com",
      password: "1324",
      driver_license: "0000"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate a non-existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "notauser@test.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    const user = {
      name: "Test",
      email: "user@test.com",
      password: "1324",
      driver_license: "0000"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: `wrong${user.password}`
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
});