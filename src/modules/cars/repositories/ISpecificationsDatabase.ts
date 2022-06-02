import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsDatabase {
  create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
  alreadyContains(name: string): Promise<Specifications>;
}

export { ISpecificationsDatabase, ICreateSpecificationsDTO };
