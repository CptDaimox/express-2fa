import express, { Router } from "express";
import { UserController } from "./UserController";

export function getUserRouter(userController: UserController) {
  const userRouter: Router = express.Router();

  userRouter.get("/:id", userController.getUserById);
  userRouter.get("/", userController.getUserByEmail, userController.getAllUsers);
  userRouter.put("/", userController.updateUser);

  return userRouter;
}
