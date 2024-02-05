import { PrismaClient } from "@prisma/client";
// import fs from 'fs'

let prisma: PrismaClient;

interface GlobalContext {
  prisma?: PrismaClient & {
    $on: any;
  };
}

declare const global: GlobalContext;

if (!global.prisma) {
  global.prisma = new PrismaClient({});

  await global.prisma.$connect();

  // global.prisma.$on(
  //     'query',
  //     (e: any) => {
  //         const log = `${e.duration}ms ${e.query}`;
  //         fs.appendFileSync('prisma.log', log + '\n');
  //     }
  // );
}

prisma = global.prisma;

// prisma log

export default prisma;
