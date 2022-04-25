interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsDatabase {
  create({ name, description }: ICreateSpecificationsDTO): void;
  alreadyContains(name: string): boolean;
}

export { ISpecificationsDatabase, ICreateSpecificationsDTO };
