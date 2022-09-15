"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationsController = require("../../../../modules/cars/useCases/createSpecifications/CreateSpecificationsController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecifications = new _CreateSpecificationsController.CreateSpecificationsController();
specificationsRoutes.use(_ensureAuthenticated.ensureAuthenticated);
specificationsRoutes.post("/", createSpecifications.handle);