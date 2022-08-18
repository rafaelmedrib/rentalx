import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import newCar from "../../../../../__tests__/mocks/CarMock";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let newCarId: string;
let newCar2Id: string;
dayjs.extend(utc);

describe("Create Rental", () => {
  beforeAll(async () => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );

    const { id } = await carsRepositoryInMemory.create(newCar.car1);
    newCarId = id;
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: newCarId,
      user_id: "654321",
      expected_return_date: dayjs.utc().add(2, "days").toDate(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental with a car with unfinished lending", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: newCarId,
        user_id: "159159",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      })
    ).rejects.toEqual(new AppError("Car has an unfinished rental"));
  });

  it("should not be able to create a rental for a user with an unfinished rent", async () => {
    const { id } = await carsRepositoryInMemory.create(newCar.car2);
    newCar2Id = id;
    await expect(
      createRentalUseCase.execute({
        car_id: id,
        user_id: "654321",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      })
    ).rejects.toEqual(new AppError("User has unreturned rental"));
  });

  it("should not be able to rent a car for less than a 24 hours period", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: newCar2Id,
        user_id: "456789",
        expected_return_date: dayjs.utc().add(5, "hours").toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours from now")
    );
  });

  it("should change car status to 'available: false' after rental register", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: newCar2Id,
      user_id: "112233",
      expected_return_date: dayjs.utc().add(3, "days").toDate(),
    });

    const { available } = await carsRepositoryInMemory.findById(rental.car_id);
    expect(available).toBe(false);
  });
});
