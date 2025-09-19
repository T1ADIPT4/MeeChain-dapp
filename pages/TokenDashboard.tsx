import { useEffect, useState } from 'react'
import { mint, transfer, getTotalSupply } from '../blockchain/meeToken'
import { mintToken, transferToken } from '../blockchain/meeToken'

useEffect(() => {
    fetchSupply()
  }, [])
export default function TokenDashboard() {
  const [supply, setSupply] = useState('')
  const [mintTo, setMintTo] = useState('')
  const [mintAmount, setMintAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingTransfer, setLoadingTransfer] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🪙 MeeToken Dashboard</h2>
      <p>📦 Total Supply: <strong>{supply}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div style={{ marginTop: '2rem' }}>
        <h3>Mint Tokens</h3>
        <input
          placeholder="To address"
          value={mintTo}
          onChange={e => setMintTo(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          placeholder="Amount"
          value={mintAmount}
          onChange={e => setMintAmount(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleMint} disabled={loadingMint}>
          {loadingMint ? 'Minting...' : 'Mint'}
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Transfer Tokens</h3>
        <input
          placeholder="To address"
          value={transferTo}
          onChange={e => setTransferTo(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          placeholder="Amount"
          value={transferAmount}
          onChange={e => setTransferAmount(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleTransfer} disabled={loadingTransfer}>
          {loadingTransfer ? 'Transferring...' : 'Transfer'}
        </button>
      </div>
    </div>
  )
}
