import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
dayjs.extend(utc);

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "123456",
      user_id: "654321",
      expected_return_date: dayjs.utc().add(2, "days").toDate(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental with a car with unfinished lending", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "654321",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      });
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "159159",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental for a user with an unfinished rent", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "159159",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      });
      await createRentalUseCase.execute({
        car_id: "456456",
        user_id: "159159",
        expected_return_date: dayjs.utc().add(2, "days").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to rent a car for less than a 24 hours period", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "456789",
        expected_return_date: dayjs.utc().add(5, "hours").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
