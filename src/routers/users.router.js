import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router
    .get("/users", userController.GET)
    .get("/users/:id", userController.GETONE)
    .post("/users", userController.POST)
    .put("/users/:id", userController.PUT)
    .delete("/users/:id", userController.DEL)

export default router;