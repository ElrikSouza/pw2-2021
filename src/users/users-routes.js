import { Router } from "express";
import { UserController } from "./user-controller.js";

export const UsersModule = Router();

UsersModule.post("/users", UserController.signUp);
