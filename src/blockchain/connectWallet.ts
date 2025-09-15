import { ethers } from 'ethers'
import abi from '../config/MeeToken.abi.json'
import { getMeechainConfig } from '../config/loadMeechain'

export async function connectWallet() {
  if (!window.ethereum) throw new Error('MetaMask not found')
  await window.ethereum.request({ method: 'eth_requestAccounts' })

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const config = getMeechainConfig()

  const contract = new ethers.Contract(config.contract.address, abi, signer)
  return { signer, contract }
}
