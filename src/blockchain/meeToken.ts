import { ethers } from 'ethers'
import abi from '../config/MeeToken.abi.json'
import { getMeechainConfig } from '../config/loadMeechain'

export async function getContractWithSigner() {
  const config = getMeechainConfig()
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return new ethers.Contract(config.contract.address, abi, signer)
}

export async function mint(to: string, amount: string) {
  const contract = await getContractWithSigner()
  const tx = await contract.mint(to, ethers.parseUnits(amount, 18))
  await tx.wait()
}

export async function transfer(to: string, amount: string) {
  const contract = await getContractWithSigner()
  const tx = await contract.transfer(to, ethers.parseUnits(amount, 18))
  await tx.wait()
}

export async function getTotalSupply(): Promise<string> {
  const config = getMeechainConfig()
  const provider = new ethers.JsonRpcProvider(config.rpcUrl)
  const contract = new ethers.Contract(config.contract.address, abi, provider)
  const supply = await contract.totalSupply()
  return ethers.formatUnits(supply, 18)
}
