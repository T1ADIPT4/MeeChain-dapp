import { ethers } from 'ethers'
import abi from '../config/MeeToken.abi.json'
import { getMeechainConfig } from '../config/loadMeechain'

const config = getMeechainConfig()
const provider = new ethers.JsonRpcProvider(config.rpcUrl)
const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider)
const contract = new ethers.Contract(config.contract.address, abi, signer)

// ฟังก์ชันหลัก
export const mint = async (to: string, amount: string) => {
  const tx = await contract.mint(to, ethers.parseUnits(amount, 18))
  await tx.wait()
}

export const transfer = async (to: string, amount: string) => {
  const tx = await contract.transfer(to, ethers.parseUnits(amount, 18))
  await tx.wait()
}

export const burn = async (amount: string) => {
  const tx = await contract.burn(ethers.parseUnits(amount, 18))
  await tx.wait()
}

export const getOwner = async (): Promise<string> => {
  return await contract.getOwner()
}

export const getTotalSupply = async (): Promise<string> => {
  const supply = await contract.totalSupply()
  return ethers.formatUnits(supply, 18)
}
