import { PrismaClient } from "@prisma/client";

declare global {
  var prismaa: PrismaClient | undefined;
}

export const db = global.prismaa || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  global.prismaa = db;
}
