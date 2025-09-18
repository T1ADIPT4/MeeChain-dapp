import { createWalletClient, custom } from 'viem'
import { hardhat } from 'viem/chains'
import { abi } from '../artifacts/contracts/MeeToken.sol/MeeToken.json'
import { mintToken, transferToken } from '../blockchain/meeToken'

// สร้าง client ที่เชื่อมกับ wallet (เช่น MetaMask)
const walletClient = createWalletClient({
  chain: hardhat,
  transport: custom(window.ethereum),
})

async function handleMint() {
  await mintToken(contractAddress, BigInt(mintAmount), setLoadingMint, setError)
}

export async function mintToken(address: `0x${string}`, amount: bigint, setLoading: Function, setError: Function) {
  try {
    setLoading(true)
    await walletClient.writeContract({
      address,
      abi,
      functionName: 'mint',
      args: [amount],
    })
  } catch (err) {
    console.error(err)
    setError('Mint ล้มเหลว')
  } finally {
    setLoading(false)
  }
}

async function handleTransfer() {
  await transferToken(contractAddress, transferTo, BigInt(transferAmount), setLoadingTransfer, setError)
}

export async function transferToken(address: `0x${string}`, to: `0x${string}`, amount: bigint, setLoading: Function, setError: Function) {
  try {
    setLoading(true)
    await walletClient.writeContract({
      address,
      abi,
      functionName: 'transfer',
      args: [to, amount],
    })
  } catch (err) {
    console.error(err)
    setError('Transfer ล้มเหลว')
  } finally {
    setLoading(false)
  }
}
