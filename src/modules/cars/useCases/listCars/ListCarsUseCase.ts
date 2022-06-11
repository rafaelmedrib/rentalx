import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  name?: string;
  categoryId?: string;
  brand?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, categoryId, brand }: IRequest) {
    const availableCars = await this.carsRepository.listAvailable(
      name,
      categoryId,
      brand
    );

    return availableCars;
  }
}

export { ListCarsUseCase };
