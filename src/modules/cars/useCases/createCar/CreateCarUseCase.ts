import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specifications[];
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findCarByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) throw new AppError("Car already exists.");

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    return car;
  }
}

export { CreateCarUseCase };
