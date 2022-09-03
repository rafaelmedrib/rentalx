import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findCarByLicensePlate(license_plate: string): Promise<Car>;
  listAvailable(
    name?: string,
    categoryId?: string,
    brand?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
