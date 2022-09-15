"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListCarsUseCase = require("./ListCarsUseCase");

let carsRepositoryInMemory;
let listCarsUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listCarsUseCase = new _ListCarsUseCase.ListCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id"
    });
    const availableCars = await listCarsUseCase.execute({});
    expect(availableCars).toEqual([car]);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2 name",
      description: "Car 2 description",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 60,
      brand: "Brand 2",
      category_id: "category_id_2"
    });
    const availableCars = await listCarsUseCase.execute({
      name: "Car 2 name"
    });
    expect(availableCars).toEqual([car]);
  });
  it("Should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3 name",
      description: "Car 3 description",
      daily_rate: 100,
      license_plate: "GHI-1234",
      fine_amount: 60,
      brand: "Brand 3",
      category_id: "category_id_3"
    });
    const availableCars = await listCarsUseCase.execute({
      categoryId: "category_id_3"
    });
    expect(availableCars).toEqual([car]);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4 name",
      description: "Car 4 description",
      daily_rate: 100,
      license_plate: "JKL-1234",
      fine_amount: 60,
      brand: "Brand 4",
      category_id: "category_id_4"
    });
    const availableCars = await listCarsUseCase.execute({
      brand: "Brand 4"
    });
    expect(availableCars).toEqual([car]);
  });
});