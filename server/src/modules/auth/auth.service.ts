import argon2 from "argon2";
import { prisma } from "../../infrastructure/prisma";
import { User } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import { env } from "../../infrastructure/env";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

class AuthService {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { email, password } = payload;

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      });

      const passwordMatches = await argon2.verify(user.password, password);

      if (!passwordMatches) {
        return {
          data: null,
          error: {
            code: 401,
            message: "Unauthorized",
          },
        };
      }

      const payload = {
        id: user.id,
      };

      const { data: tokenData, error: tokenError } =
        await this.generateToken(payload);

      await prisma.authToken.create({
        data: {
          userId: user.id,
          token: tokenData.token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
      if (tokenError !== null) {
        return {
          data: null,
          error: {
            code: 401,
            message: "Unauthorized",
          },
        };
      }

      return {
        data: {
          user,
          token: tokenData.token,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          code: 401,
          message: "Unauthorized",
        },
      };
    }
  }

  async signup(payload: SignupPayload): Promise<SignupResponse> {
    try {
      const { password, email } = payload;

      const hashedPassword = await argon2.hash(password);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return {
        data: {
          user: newUser,
        },
        error: null,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return {
          data: null,
          error: {
            code: 400,
            message: "Email already exists",
          },
        };
      }
      return {
        data: null,
        error: {
          code: 500,
          message: "Internal server error",
        },
      };
    }
  }

  async generateToken(
    payload: Record<string, string>,
  ): Promise<GenerateTokenResponse> {
    try {
      const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        error: null,
        data: {
          token,
        },
      };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: "Internal server error",
        },
        data: null,
      };
    }
  }
}

export const authService = new AuthService();

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse =
  | {
      data: {
        token: string;
        user: User;
      };
      error: null;
    }
  | {
      data: null;
      error: {
        code: number;
        message: string;
      };
    };

type SignupPayload = {
  email: string;
  password: string;
};

type SignupResponse =
  | {
      data: {
        user: User;
      };
      error: null;
    }
  | {
      data: null;
      error: {
        code: number;
        message: string;
      };
    };

type GenerateTokenResponse =
  | {
      data: {
        token: string;
      };
      error: null;
    }
  | {
      data: null;
      error: {
        code: number;
        message: string;
      };
    };
