import { PrismaClient } from '@prisma/client/scripts/default-index'

declare global {
  namespace globalThis {
    var prismadb: PrismaClient
    }
}