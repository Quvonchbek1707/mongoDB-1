import { Router } from "express";
import postController from "../controllers/post.controller.js"

const router = Router();

router
    .post("/posts", postController.POST)
    .get("/posts", postController.GET)
    .get("/posts/:id", postController.GETONE)
    .put("/posts/:id", postController.PUT)
    .delete("/posts/:id", postController.DEL)

export default router;