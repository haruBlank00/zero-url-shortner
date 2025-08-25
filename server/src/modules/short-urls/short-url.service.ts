import { nanoid } from "nanoid";
import { prisma } from "../../infrastructure/prisma";
import { ShortUrl } from "../../generated/prisma";

class ShortUrlService {
  async createShortUrl(payload: CreateShortUrlPayload) {
    try {
      const slug = nanoid(8);
      const shortUrl = await prisma.shortUrl.create({
        data: {
          slug,
          ...payload,
        },
      });

      return {
        data: shortUrl,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        },
      };
    }
  }

  async getShortUrl(slug: string, opts: GetShortUrlOpts) {
    console.log({
      slug,
      opts,
    });
    try {
      const shortUrl = await prisma.shortUrl.findUniqueOrThrow({
        where: {
          slug,
        },
      });

      console.log("adding click...", shortUrl);
      await this.addClick(shortUrl.id, opts);

      const normalizedLongUrl = this.normalizeUrl(shortUrl.longUrl);
      return {
        data: {
          ...shortUrl,
          longUrl: normalizedLongUrl,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        },
      };
    }
  }

  async getAllShortUrls(userId: string) {
    try {
      const shortUrls = await prisma.shortUrl.findMany({
        where: {
          userId,
        },
      });
      return {
        data: shortUrls,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        },
      };
    }
  }

  protected async addClick(shortUrlId: string, opts: GetShortUrlOpts) {
    try {
      const click = await prisma.click.create({
        data: {
          ...opts,
          shortUrlId,
        },
      });

      console.log({
        click,
      });
    } catch (error) {
      console.log("Error from updateCount", error);
    }
  }

  protected normalizeUrl(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
      return "https://" + url;
    }
    return url;
  }
}

export const shortUrlService = new ShortUrlService();

type CreateShortUrlPayload = {
  userId: string;

  longUrl: string;

  expiresAt?: Date;

  title?: string;
};

export type GetShortUrlOpts = {
  ipAddress: string;

  userAgent: string;

  referrer: string;
};
