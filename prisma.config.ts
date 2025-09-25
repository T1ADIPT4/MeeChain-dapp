import { PrismaClient } from 'app/generated-prisma-client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

const { WORKSPACE, NETWORK } = process.env;
require('ts-node').register();
require(`../prisma/seeds/${WORKSPACE}/${NETWORK}.ts`);

const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" }
  },
})
