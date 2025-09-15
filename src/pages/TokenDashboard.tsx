import { useEffect, useState } from 'react'
import { mint, transfer, getTotalSupply } from '../blockchain/meeToken'

export default function TokenDashboard() {
  const [supply, setSupply] = useState('')
  const [mintTo, setMintTo] = useState('')
  const [mintAmount, setMintAmount] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')

  useEffect(() => {
    async function fetchSupply() {
      const s = await getTotalSupply()
      setSupply(s)
    }
    fetchSupply()
  }, [])

  const handleMint = async () => {
    await mint(mintTo, mintAmount)
    const s = await getTotalSupply()
    setSupply(s)
  }

  const handleTransfer = async () => {
    await transfer(transferTo, transferAmount)
    const s = await getTotalSupply()
    setSupply(s)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🪙 MeeToken Dashboard</h2>
      <p>📦 Total Supply: <strong>{supply}</strong></p>

      <div style={{ marginTop: '2rem' }}>
        <h3>Mint Tokens</h3>
        <input placeholder="To address" value={mintTo} onChange={e => setMintTo(e.target.value)} />
        <input placeholder="Amount" value={mintAmount} onChange={e => setMintAmount(e.target.value)} />
        <button onClick={handleMint}>Mint</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Transfer Tokens</h3>
        <input placeholder="To address" value={transferTo} onChange={e => setTransferTo(e.target.value)} />
        <input placeholder="Amount" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} />
        <button onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  )
}
