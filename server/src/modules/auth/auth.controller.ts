import { Request, Response } from "express";
import { SuccessResponse } from "../../types/success-response";
import { User } from "../../generated/prisma";
import { ErrorResponse } from "../../types/error-response";
import { authService } from "./auth.service";

class AuthController {
  async login(
    request: Request,
    response: Response<LoginResponse | ErrorResponse>,
  ) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        status: 400,
        message: "Bad request",
        data: null,
        error: {
          code: 400,
          message: "Email and password are required",
        },
      });
    }

    const { data, error } = await authService.login({
      email,
      password,
    });

    if (error !== null) {
      return response.status(error.code).json({
        status: error.code,
        message: error.message,
        data: null,
        error,
      });
    }

    return response.status(200).json({
      status: 200,
      message: "Success",
      data,
      error: null,
    });
  }

  async signup(
    request: Request,
    response: Response<SignupResponse | ErrorResponse>,
  ) {
    console.log(request.body, "rqu body");
    const { email, password, confirmPassword } = request.body;

    if (!email || !password || !confirmPassword) {
      return response.status(400).json({
        status: 400,
        message: "Bad request",
        data: null,
        error: {
          code: 400,
          message: "Email and password are required",
        },
      });
    }

    const { data: signupData, error: signupError } = await authService.signup({
      email,
      password,
    });

    if (signupError !== null) {
      return response.status(signupError.code).json({
        status: signupError.code,
        message: signupError.message,
        data: null,
        error: signupError,
      });
    }

    return response.status(200).json({
      status: 200,
      message: "Success",
      data: signupData,
      error: null,
    });
  }
}

const authController = new AuthController();

export { authController };

type LoginResponse = SuccessResponse<{
  token: string;
  user: User;
}>;

type SignupResponse = SuccessResponse<{
  user: User;
}>;
