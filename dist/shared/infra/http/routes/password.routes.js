"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoute = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");

var _SendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoute = (0, _express.Router)();
exports.passwordRoute = passwordRoute;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoute.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoute.post("/reset", resetPasswordController.handle);