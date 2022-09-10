import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@modules/accounts/useCases/updateAvatar/UpdateAvatarController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/UserProfileController";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const userProfileController = new UserProfileController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);
usersRoutes.get("/profile", ensureAuthenticated, userProfileController.handle);

export { usersRoutes };
