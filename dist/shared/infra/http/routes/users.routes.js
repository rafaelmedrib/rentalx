"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _UpdateAvatarController = require("../../../../modules/accounts/useCases/updateAvatar/UpdateAvatarController");

var _UserProfileController = require("../../../../modules/accounts/useCases/userProfile/UserProfileController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new _CreateUserController.CreateUserController();
const updateAvatarController = new _UpdateAvatarController.UpdateAvatarController();
const userProfileController = new _UserProfileController.UserProfileController();
const uploadAvatar = (0, _multer.default)(_upload.default);
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, userProfileController.handle);