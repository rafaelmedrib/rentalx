import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      license_plate,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvailable(
    name?: string,
    categoryId?: string,
    brand?: string
  ): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (!name && !categoryId && !brand) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (name === car.name) return true;
      if (categoryId === car.category_id) return true;
      if (brand === car.brand) return true;
      return false;
    });

    return availableCars;
  }

  async findById(card_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === card_id);
    return car;
  }
}

export { CarsRepositoryInMemory };
