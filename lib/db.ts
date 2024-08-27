import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import exp from "constants";
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
