"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("Should not be able to add a specification to a non-existing car", async () => {
    const car_id = "123456";
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: ["12345", "6789"]
    })).rejects.toEqual(new _AppError.AppError("Car does not exist"));
  });
  it("Should be able to add specifications to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "4 portas",
      description: "4 portas"
    });
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id]
    });
    const updatedCar = await carsRepositoryInMemory.findCarByLicensePlate(car.license_plate);
    expect(updatedCar).toHaveProperty("specifications");
    expect(updatedCar.specifications.length).toBeGreaterThanOrEqual(1);
  });
});