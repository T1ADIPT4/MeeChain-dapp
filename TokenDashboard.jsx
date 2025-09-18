import { createWalletClient, custom } from 'viem'
import { hardhat } from 'viem/chains'
import { abi } from '../artifacts/contracts/MeeToken.sol/MeeToken.json'
import { mintToken, transferToken } from '../blockchain/meeToken'

// Inside your React component
const [loadingMint, setLoadingMint] = useState(false)
const [error, setError] = useState(null)

async function handleMint() {
  if (!mintAmount || isNaN(mintAmount) || Number(mintAmount) <= 0) {
    setError('Invalid mint amount')
    return
  }
  setLoadingMint(true)
  setError(null)
  try {
    await mintToken(contractAddress, BigInt(mintAmount))
  } catch (err) {
    setError('Mint ล้มเหลว')
  } finally {
    setLoadingMint(false)
  }
}

// In meeToken.js
export async function mintToken(address, amount) {
  return walletClient.writeContract({
    address,
    abi,
    functionName: 'mint',
    args: [amount],
  })
}
