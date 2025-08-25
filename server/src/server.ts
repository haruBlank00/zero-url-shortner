import { app } from "./app";

import dotenv from "dotenv";
import { env } from "./infrastructure/env";
import { Request, Response } from "express";
import { SuccessResponse } from "./types/success-response";

dotenv.config();

const PORT = env.PORT;

app.get(
  "/ping",
  (
    request: Request,
    response: Response<
      SuccessResponse<{
        pong: boolean;
      }>
    >,
  ) => {
    return response.json({
      status: 200,
      message: "success",
      data: {
        pong: true,
      },
      error: null,
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
