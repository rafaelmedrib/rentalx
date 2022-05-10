import { ISpecificationsDatabase } from "../../repositories/ISpecificationsDatabase";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationsUseCase {
  private specificationsDatabase: ISpecificationsDatabase;
  constructor(specificationsDatabase) {
    this.specificationsDatabase = specificationsDatabase;
  }

  execute({ name, description }: IRequest): void {
    if (this.specificationsDatabase.alreadyContains(name)) {
      throw new Error("Specifications already exists!");
    }

    this.specificationsDatabase.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationsUseCase };
