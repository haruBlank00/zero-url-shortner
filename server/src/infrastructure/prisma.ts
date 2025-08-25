import { PrismaClient } from "../generated/prisma";

class PrismaSingleton {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}

export const prisma = PrismaSingleton.getInstance();
