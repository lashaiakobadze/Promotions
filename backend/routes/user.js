import express from "express";
import * as UserController from "../controllers/user";

export const userRouter = express.Router();

userRouter.post("/signup", UserController.createUser);

userRouter.post("/login", UserController.userLogin);
