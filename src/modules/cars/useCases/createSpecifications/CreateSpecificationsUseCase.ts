import { inject, injectable } from "tsyringe";

import { ISpecificationsDatabase } from "../../repositories/ISpecificationsDatabase";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsDatabase")
    private specificationsDatabase: ISpecificationsDatabase
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExists =
      await this.specificationsDatabase.alreadyContains(name);
    if (specificationExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationsDatabase.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationsUseCase };
