"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarImagesRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalRepository");

var _DayjsDateProvider = require("./providers/DateProvider/implementations/DayjsDateProvider");

var _EtherealMailProvider = require("./providers/MailProvider/implementations/EtherealMailProvider");

var _SESMailProvider = require("./providers/MailProvider/implementations/SESMailProvider");

var _LocalStorageProvider = require("./providers/StorageProvider/implementations/LocalStorageProvider");

var _S3StorageProvider = require("./providers/StorageProvider/implementations/S3StorageProvider");

_tsyringe.container.registerSingleton("CategoriesDatabase", _CategoriesRepository.CategoriesDatabase);

_tsyringe.container.registerSingleton("SpecificationsDatabase", _SpecificationsRepository.SpecificationsDatabase);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarImagesRepository", _CarImagesRepository.CarImagesRepository);

_tsyringe.container.registerSingleton("RentalRepository", _RentalRepository.RentalRepository);

_tsyringe.container.registerSingleton("DayjsDateProvider", _DayjsDateProvider.DayjsDateProvider);

const mailProvider = {
  ethereal: _EtherealMailProvider.EtherealMailProvider,
  ses: _SESMailProvider.SESMailProvider
};

_tsyringe.container.registerSingleton("MailProvider", (0, _tsyringe.delay)(() => mailProvider[process.env.MAIL_PROVIDER]));

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);

const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", (0, _tsyringe.delay)(() => diskStorage[process.env.DISK]));