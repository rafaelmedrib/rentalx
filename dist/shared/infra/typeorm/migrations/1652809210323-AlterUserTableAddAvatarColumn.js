"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserTableAddAvatarColumn1652809210323 = void 0;

var _typeorm = require("typeorm");

class AlterUserTableAddAvatarColumn1652809210323 {
  async up(queryRunner) {
    await queryRunner.addColumn(new _typeorm.Table({
      name: "users"
    }), new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }

}

exports.AlterUserTableAddAvatarColumn1652809210323 = AlterUserTableAddAvatarColumn1652809210323;