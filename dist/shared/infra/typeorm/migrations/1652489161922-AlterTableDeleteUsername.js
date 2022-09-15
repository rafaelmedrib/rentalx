"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterTableDeleteUsername1652489161922 = void 0;

var _typeorm = require("typeorm");

class AlterTableDeleteUsername1652489161922 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterTableDeleteUsername1652489161922 = AlterTableDeleteUsername1652489161922;