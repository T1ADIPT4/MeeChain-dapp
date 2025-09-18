import { createWalletClient, custom } from 'viem'
import { hardhat } from 'viem/chains'
import { abi } from '../artifacts/contracts/MeeToken.sol/MeeToken.json'
import { mintToken, transferToken } from '../blockchain/meeToken'

// Inside your React component
const [loadingMint, setLoadingMint] = useState(false)
const [error, setError] = useState(null)

async function handleMint() {
  setError(null)

  if (!mintAmount || isNaN(mintAmount) || Number(mintAmount) <= 0 || !Number.isInteger(Number(mintAmount))) {
    setError('กรุณากรอกจำนวนที่ต้องการ mint เป็นจำนวนเต็มบวก')
    return
  }

  if (!contractAddress || typeof contractAddress !== 'string' || contractAddress.length !== 42) {
    setError('Contract address ไม่ถูกต้อง')
    return
  }

  setLoadingMint(true)
  try {
    await mintToken(contractAddress, BigInt(mintAmount))
  } catch (err) {
    setError('Mint ล้มเหลว: ' + (err?.message || err))
  } finally {
    setLoadingMint(false)
  }
}
