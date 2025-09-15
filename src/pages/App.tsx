import { useEffect, useState } from 'react'
import { mint, transfer, getTotalSupply } from '../blockchain/meeToken'

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
      await mint(mintTo, mintAmount)
      await fetchSupply()
      setSuccess(`✅ Minted ${mintAmount} tokens to ${mintTo}`)
    } catch (err) {
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
      await transfer(transferTo, transferAmount)
      await fetchSupply()
      setSuccess(`✅ Transferred ${transferAmount} tokens to ${transferTo}`)
    } catch (err) {
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
