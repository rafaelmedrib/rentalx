"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _AppError = require("../../errors/AppError");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _routes = require("./routes");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use(_routes.router);
app.use( // eslint-disable-next-line @typescript-eslint/no-unused-vars
(error, request, response, next) => {
  if (error instanceof _AppError.AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error: ${error.message}`
  });
});