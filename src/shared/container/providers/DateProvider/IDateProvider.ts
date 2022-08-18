interface IDateProvider {
  differenceInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  differenceInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
