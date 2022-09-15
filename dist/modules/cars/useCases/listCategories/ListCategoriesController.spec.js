"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Test list categories controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`
  INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) 
  VALUES ('${id}', 'Admin', 'admin@rentalx.com', '${password}', 'XXXXX', true, 'now()')
  `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list all categories", async () => {
    const authenticationResponse = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin"
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest Description"
    }).send({
      Authorization: `Bearer ${authenticationResponse.body.token}`
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest 2",
      description: "Category Supertest Description 2"
    }).send({
      Authorization: `Bearer ${authenticationResponse.body.token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.statusCode).toBe(200);
  });
});