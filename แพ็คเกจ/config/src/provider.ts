import { BrowserProvider, JsonRpcProvider, Contract, parseUnits } from 'ethers'
import abiMeeToken from '../../contracts/abi/MeeToken.json'
import { getContractConfig } from './loader'

type SignerMode = 'browser' | 'server'

export function makeProvider(mode: SignerMode, rpcUrl: string) {
  if (mode === 'browser' && typeof window !== 'undefined' && (window as any).ethereum) {
    return new BrowserProvider((window as any).ethereum)
  }
  return new JsonRpcProvider(rpcUrl)
}

export async function connectMeeToken(opts?: { mode?: SignerMode; networkName?: string; contractName?: string }) {
  const networkName = opts?.networkName || import.meta.env.VITE_NETWORK || 'meechain'
  const contractName = opts?.contractName || import.meta.env.VITE_CONTRACT_NAME || 'MeeToken'

  const { network, contract } = getContractConfig(networkName, contractName)
  const provider = makeProvider(opts?.mode || 'browser', network.rpcUrl)
  const signer = 'getSigner' in provider ? await (provider as any).getSigner() : undefined

  const abi = abiMeeToken // or dynamic import by path if needed
  const instance = new Contract(contract.address, abi, signer || (provider as any))

  const helpers = {
    decimals: contract.decimals,
    parse(amount: string) { return parseUnits(amount, contract.decimals) }
  }

  return { instance, provider, signer, network, contract, helpers }
}
