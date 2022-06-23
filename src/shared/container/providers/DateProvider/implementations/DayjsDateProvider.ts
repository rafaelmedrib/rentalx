import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

@injectable()
class DayjsDateProvider implements IDateProvider {
  differenceInHours(start_date: Date, end_date: Date): number {
    return dayjs(end_date).diff(start_date, "hours");
  }
  convertToUTC(date: Date): Date {
    return dayjs.utc(date).toDate();
  }
}

export { DayjsDateProvider };
