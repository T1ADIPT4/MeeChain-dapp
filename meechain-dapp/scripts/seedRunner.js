const { WORKSPACE, NETWORK } = process.env;
require('ts-node').register();
require(`../prisma/seeds/${WORKSPACE}/${NETWORK}.ts`);
