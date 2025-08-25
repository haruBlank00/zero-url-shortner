import { Router } from "express";
import { shortUrlController } from "./short-url.controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

export const shortUrlRouter = Router();

shortUrlRouter.post("/urls", authMiddleware, shortUrlController.createShortUrl);

shortUrlRouter.get("/urls", authMiddleware, shortUrlController.getAllShortUrls);

shortUrlRouter.get("/:slug", shortUrlController.getShortUrl);
