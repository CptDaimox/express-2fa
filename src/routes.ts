import { userRouter } from "@/components/user";
import express, { Router } from "express";

const mainRouter: Router = express.Router();

mainRouter.use("/users", userRouter);
