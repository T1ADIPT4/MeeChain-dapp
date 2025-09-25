import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: process.env.RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    fuse: {
      url: process.env.FUSE_RPC_URL || "",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;
