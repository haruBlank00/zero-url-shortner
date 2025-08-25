import { Request, Response } from "express";
import { GetShortUrlOpts, shortUrlService } from "./short-url.service";
import { SuccessResponse } from "../../types/success-response";
import { ShortUrl } from "../../generated/prisma";
import { ErrorResponse } from "../../types/error-response";

class ShortUrlController {
  async createShortUrl(
    request: Request,
    response: Response<CreateShortUrlResponse>,
  ) {
    // validate body later using zod or vine
    const payload = request.body as CreateShortUrlBody;
    const userId = request.userId;

    const { data, error } = await shortUrlService.createShortUrl({
      ...payload,
      userId,
    });

    if (error !== null) {
      return response.status(500).json({
        status: 500,
        message: error.message,
        data: null,
        error,
      });
    }

    return response.status(201).json({
      status: 201,
      message: "Short url created successfully",
      data,
      error: null,
    });
  }

  async getShortUrl(request: Request, response: Response<GetShortUrlResponse>) {
    const slug = request.params.slug;

    const ipAddress = request.ip;
    const userAgent = request.headers["user-agent"];
    const referrer = request.headers.referer;

    const opts: GetShortUrlOpts = {
      ipAddress,
      userAgent,
      referrer,
    };

    const { data, error } = await shortUrlService.getShortUrl(slug, opts);

    if (error !== null) {
      return response.status(500).json({
        status: 500,
        message: error.message,
        data: null,
        error,
      });
    }

    return response.redirect(301, data.longUrl);
  }

  async getAllShortUrls(
    request: Request,
    response: Response<GetAllShortUrlsResponse>,
  ) {
    const userId = request.userId;

    const { data, error } = await shortUrlService.getAllShortUrls(userId);

    if (error !== null) {
      return response.status(500).json({
        status: 500,
        message: error.message,
        data: null,
        error,
      });
    }

    return response.status(200).json({
      status: 200,
      message: "Short urls fetched successfully",
      data,
      error: null,
    });
  }
}

export const shortUrlController = new ShortUrlController();

type CreateShortUrlBody = {
  longUrl: string;
  expiresAt?: Date;
  title?: string;
};

type CreateShortUrlResponse = SuccessResponse<ShortUrl> | ErrorResponse;

type GetShortUrlResponse = SuccessResponse<ShortUrl> | ErrorResponse;

type GetAllShortUrlsResponse = SuccessResponse<ShortUrl[]> | ErrorResponse;
