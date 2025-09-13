// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const MeeToken = await ethers.getContractFactory("MeeToken");
  const meeToken = await MeeToken.deploy();
  await meeToken.deployed();
  console.log("MeeToken deployed to:", meeToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
