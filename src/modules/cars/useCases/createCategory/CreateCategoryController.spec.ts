import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/index";

let connection: Connection;

describe("Test create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
  INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) 
  VALUES ('${id}', 'Admin', 'admin@rentalx.com', '${password}', 'XXXXX', true, 'now()')
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a category", async () => {
    const authenticationResponse = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .send({
        Authorization: `Bearer ${authenticationResponse.body.token}`,
      });

    expect(response.statusCode).toBe(201);
  });

  it("Should not be able to create a category when name has been used already", async () => {
    const authenticationResponse = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .send({
        Authorization: `Bearer ${authenticationResponse.body.token}`,
      });

    expect(response.statusCode).toBe(400);
  });
});
