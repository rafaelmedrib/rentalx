import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";

import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
    return rental;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    dayjs.extend(utc);

    const now = dayjs.utc().toDate();
    const difference = dayjs(expected_return_date).diff(now, "hours");
    const differenceIsGreaterThan24Hours = difference > 24;

    if (!differenceIsGreaterThan24Hours) {
      throw new AppError(
        "Expected return date must be at least 24 hours from now"
      );
    }

    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: dayjs.utc().toDate(),
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalRepositoryInMemory };
