import { useEffect, useState } from 'react'
import { mint, transfer, getTotalSupply } from '../blockchain/meeToken'

// Component ย่อย: สำหรับแสดงผล input และปุ่มสำหรับ Mint หรือ Transfer
function TokenActionForm({
  title,
  actionLabel,
  toValue,
  onToChange,
  amountValue,
  onAmountChange,
  onAction,
  loading
}) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>{title}</h3>
      <input
        placeholder="To address"
        value={toValue}
        onChange={e => onToChange(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        placeholder="Amount"
        value={amountValue}
        onChange={e => onAmountChange(e.target.value)}
        // แนะนำให้เพิ่ม type="number" หากค่าที่รับเป็นตัวเลขเสมอ
        // type="number"
        style={{ marginRight: '1rem' }}
      />
      <button onClick={onAction} disabled={loading}>
        {loading ? `${actionLabel}ing...` : actionLabel}
      </button>
    </div>
  )
}

// Component หลัก
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

  useEffect(() => {
    fetchSupply()
  }, [])

  async function fetchSupply() {
    try {
      const s = await getTotalSupply()
      setSupply(s)
    } catch (err) {
      setError('ไม่สามารถโหลด total supply ได้')
    }
  }

  const handleMint = async () => {
    setLoadingMint(true)
    setError('')
    setSuccess('')
    try {
      // *เพิ่ม: ควรมีการตรวจสอบเบื้องต้น (Basic validation) ที่นี่ก่อนเรียกฟังก์ชัน blockchain
      if (!mintTo || !mintAmount || isNaN(Number(mintAmount)) || Number(mintAmount) <= 0) {
        setError('❌ ข้อมูล Mint ไม่ถูกต้อง กรุณาตรวจสอบ To Address และ Amount')
        return // หยุดการทำงาน
      }

      await mint(mintTo, mintAmount)
      await fetchSupply()
      setSuccess(`✅ Minted ${mintAmount} tokens to ${mintTo}`)
      setMintTo('') // ล้างค่าหลังจากสำเร็จ
      setMintAmount('')
    } catch (err) {
      console.error(err)
      setError('❌ Mint ล้มเหลว')
    } finally {
      setLoadingMint(false)
    }
  }

  const handleTransfer = async () => {
    setLoadingTransfer(true)
    setError('')
    setSuccess('')
    try {
      // *เพิ่ม: ควรมีการตรวจสอบเบื้องต้น (Basic validation) ที่นี่ก่อนเรียกฟังก์ชัน blockchain
      if (!transferTo || !transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
        setError('❌ ข้อมูล Transfer ไม่ถูกต้อง กรุณาตรวจสอบ To Address และ Amount')
        return // หยุดการทำงาน
      }

      await transfer(transferTo, transferAmount)
      await fetchSupply()
      setSuccess(`✅ Transferred ${transferAmount} tokens to ${transferTo}`)
      setTransferTo('') // ล้างค่าหลังจากสำเร็จ
      setTransferAmount('')
    } catch (err) {
      console.error(err)
      setError('❌ Transfer ล้มเหลว')
    } finally {
      setLoadingTransfer(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🪙 MeeToken Dashboard</h2>
      <p>📦 Total Supply: <strong>{supply}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* ใช้ Component ย่อยสำหรับ Mint */}
      <TokenActionForm
        title="Mint Tokens"
        actionLabel="Mint"
        toValue={mintTo}
        onToChange={setMintTo}
        amountValue={mintAmount}
        onAmountChange={setMintAmount}
        onAction={handleMint}
        loading={loadingMint}
      />

      {/* ใช้ Component ย่อยสำหรับ Transfer */}
      <TokenActionForm
        title="Transfer Tokens"
        actionLabel="Transfer"
        toValue={transferTo}
        onToChange={setTransferTo}
        amountValue={transferAmount}
        onAmountChange={setTransferAmount}
        onAction={handleTransfer}
        loading={loadingTransfer}
      />
    </div>
  )
}
