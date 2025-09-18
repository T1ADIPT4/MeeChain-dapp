import { hardhat } from 'viem/chains'
import { abi } from '../artifacts/contracts/MeeToken.sol/MeeToken.json'
import { mintToken, transferToken } from '../blockchain/meeToken'
import { createWalletClient, custom } from 'viem'

// Inside your React component
const [loadingMint, setLoadingMint] = useState(false)
const [error, setError] = useState(null)

async function handleMint() {
  setError(null);

  // ตรวจสอบ mintAmount
  if (!mintAmount || isNaN(mintAmount) || Number(mintAmount) <= 0 || !Number.isInteger(Number(mintAmount))) {
    setError('กรุณากรอกจำนวนที่ต้องการ mint เป็นจำนวนเต็มบวก');
    return;
  }

  // ตรวจสอบ contractAddress
  if (!contractAddress || typeof contractAddress !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    setError('Contract address ไม่ถูกต้อง');
    return;
  }

  setLoadingMint(true);
  try {
    await mintToken(contractAddress, BigInt(mintAmount));
    // เพิ่มแจ้งเตือนเมื่อสำเร็จ
    alert('Mint สำเร็จ!');
  } catch (err) {
    // แสดง error จากระบบหรือ Blockchain แบบละเอียด
    setError('Mint ล้มเหลว: ' + (err?.message || JSON.stringify(err)));
  } finally {
    setLoadingMint(false);
  }
}
