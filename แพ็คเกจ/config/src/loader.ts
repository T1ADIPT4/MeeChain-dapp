import { z } from 'zod'

const ContractSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  abiPath: z.string(),
  decimals: z.number().int().min(0).max(36),
  version: z.string()
})

const NetworkSchema = z.object({
  chainId: z.number().int().positive(),
  rpcUrl: z.string().url(),
  contracts: z.record(z.string(), ContractSchema)
})

const RootSchema = z.record(z.string(), NetworkSchema)

type RootConfig = z.infer<typeof RootSchema>
type NetworkConfig = z.infer<typeof NetworkSchema>

let cached: { root?: RootConfig } = {}

export function loadRootConfig(): RootConfig {
  if (cached.root) return cached.root
  // Use import assertion to allow bundlers to include JSON
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const raw = require('../contracts.json')
  const parsed = RootSchema.parse(raw)
  cached.root = parsed
  return parsed
}

export function getNetworkConfig(name: string): NetworkConfig {
  const root = loadRootConfig()
  const cfg = root[name]
  if (!cfg) throw new Error(`Network config not found: ${name}`)
  return cfg
}

export function getContractConfig(networkName: string, contractName: string) {
  const net = getNetworkConfig(networkName)
  const c = net.contracts[contractName]
  if (!c) throw new Error(`Contract not found: ${networkName}.${contractName}`)
  return { network: net, contract: c }
}
