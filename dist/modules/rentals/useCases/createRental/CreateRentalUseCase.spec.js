"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalRepositoryInMemory = require("../../repositories/in-memory/RentalRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CarMock = _interopRequireDefault(require("../../../../../__tests__/mocks/CarMock"));

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rentalRepositoryInMemory;
let carsRepositoryInMemory;
let dayjsDateProvider;
let createRentalUseCase;
let newCarId;
let newCar2Id;

_dayjs.default.extend(_utc.default);

describe("Create Rental", () => {
  beforeAll(async () => {
    rentalRepositoryInMemory = new _RentalRepositoryInMemory.RentalRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    const {
      id
    } = await carsRepositoryInMemory.create(_CarMock.default.car1);
    newCarId = id;
  });
  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: newCarId,
      user_id: "654321",
      expected_return_date: _dayjs.default.utc().add(2, "days").toDate()
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a rental with a car with unfinished lending", async () => {
    await expect(createRentalUseCase.execute({
      car_id: newCarId,
      user_id: "159159",
      expected_return_date: _dayjs.default.utc().add(2, "days").toDate()
    })).rejects.toEqual(new _AppError.AppError("Car has an unfinished rental"));
  });
  it("should not be able to create a rental for a user with an unfinished rent", async () => {
    const {
      id
    } = await carsRepositoryInMemory.create(_CarMock.default.car2);
    newCar2Id = id;
    await expect(createRentalUseCase.execute({
      car_id: id,
      user_id: "654321",
      expected_return_date: _dayjs.default.utc().add(2, "days").toDate()
    })).rejects.toEqual(new _AppError.AppError("User has unreturned rental"));
  });
  it("should not be able to rent a car for less than a 24 hours period", async () => {
    await expect(createRentalUseCase.execute({
      car_id: newCar2Id,
      user_id: "456789",
      expected_return_date: _dayjs.default.utc().add(5, "hours").toDate()
    })).rejects.toEqual(new _AppError.AppError("Expected return date must be at least 24 hours from now"));
  });
  it("should change car status to 'available: false' after rental register", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: newCar2Id,
      user_id: "112233",
      expected_return_date: _dayjs.default.utc().add(3, "days").toDate()
    });
    const {
      available
    } = await carsRepositoryInMemory.findById(rental.car_id);
    expect(available).toBe(false);
  });
});