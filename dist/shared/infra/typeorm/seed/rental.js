"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedRental = seedRental;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function seedRental(user_id, car_id) {
  const connection = await (0, _index.default)("localhost");
  const id = (0, _uuid.v4)();
  const rentalDate = (0, _dayjs.default)().subtract(60, "hours").format();
  await connection.query(`
  INSERT INTO rentals (id, user_id, car_id, start_date, end_date, total, expected_return_date, created_at, updated_at) 
  VALUES ('${id}', '${user_id}', '${car_id}', '${rentalDate}', null, null, '${(0, _dayjs.default)().subtract(20, "hours").format()}', '${rentalDate}', '${rentalDate}')
  `).then(() => console.log("Rental created"));
  await connection.query(`
    UPDATE cars SET available=false WHERE id=${car_id}
`);
  return id;
}