import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(`
  INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) 
  VALUES ('${id}', 'Admin', 'admin@rentalx.com', '${password}', 'XXXXX', true, 'now()')
  `);
}

create().then(() => console.log("Admin user created."));
