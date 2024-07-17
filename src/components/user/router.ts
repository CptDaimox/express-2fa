import express, { Router } from "express";
import { UserController } from "./UserController";
import { UserService } from "@services/UserService";
import { UserRepository } from "@/repositories/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRouter: Router = express.Router();

userRouter.get("/:id", userController.getUserById);
userRouter.get("/", userController.getUserByEmail, userController.getAllUsers);
userRouter.put("/:id", userController.updateUser);
