import dayjs from "dayjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function seedRental(user_id: string, car_id: string): Promise<string> {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const rentalDate = dayjs().subtract(60, "hours").format();

  await connection
    .query(
      `
  INSERT INTO rentals (id, user_id, car_id, start_date, end_date, total, expected_return_date, created_at, updated_at) 
  VALUES ('${id}', '${user_id}', '${car_id}', '${rentalDate}', null, null, '${dayjs()
        .subtract(20, "hours")
        .format()}', '${rentalDate}', '${rentalDate}')
  `
    )
    .then(() => console.log("Rental created"));

  await connection.query(`
    UPDATE cars SET available=false WHERE id=${car_id}
`);
  return id;
}

export { seedRental };
