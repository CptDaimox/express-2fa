import { getUserRouter } from "@/components/user";
import { AuthService } from "@/services/AuthService";
import { UserController } from "@components/user/UserController";
import { AuthMiddleware } from "@middlewares/AuthMiddleware";
import { UserRepository } from "@repositories/UserRepository";
import { UserService } from "@services/UserService";
import express, { Router } from "express";
import { AuthController } from "./components/auth/AuthController";
import { TwilioService } from "./services/TwoFactorSMSService";

export const mainRouter: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = getUserRouter(userController);

const twilioService = new TwilioService();
const authService = new AuthService();
const authController = new AuthController(authService, userService, twilioService);
const authMiddleware = new AuthMiddleware(authService);

mainRouter.post("/login", authController.login);
mainRouter.post("/register", authController.register);
mainRouter.post("/verify", authController.verifyTwoFactorCode);
mainRouter.use(authMiddleware.authMiddleware);
mainRouter.use("/users", userRouter);
