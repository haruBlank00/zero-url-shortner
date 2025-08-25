import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { shortUrlRouter } from "./modules/short-urls/short-url.routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/", shortUrlRouter);

export { app };
