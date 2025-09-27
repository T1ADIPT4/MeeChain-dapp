

'use client'

import React, { useState, useEffect } from 'react';

export default function MeeChainApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [nftCards, setNftCards] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [selectedTab, setSelectedTab] = useState('missions');
  const [draggedCard, setDraggedCard] = useState(null);
  const [subWallets, setSubWallets] = useState({});
  const [meeBotMessage, setMeeBotMessage] = useState("สวัสดีคะ! ฉันคือ MeeBot ผู้ช่วย CyberQuest ของคุณ! พร้อมที่จะเริ่มภารกิจในโลก Web3 กันไหมคะ? 🚀");
  const [questProgress, setQuestProgress] = useState(0);
  const [totalQuests] = useState(5);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Show loading screen for 4 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Token balances state
  const [tokenBalances, setTokenBalances] = useState({
    MEE: 0,
    T2P: 0,
    USDC: 0,
    BNB: 0
  });

  // Bridge state
  const [bridgeAmount, setBridgeAmount] = useState('');
  const [bridgeFromChain, setBridgeFromChain] = useState('MintMe');
  const [bridgeToChain, setBridgeToChain] = useState('BSC');
  const [bridgeHistory, setBridgeHistory] = useState([]);

  // Mock NFT data with enhanced attributes for sub-wallet system
  const mockNFTCards = [
    {
      id: 1,
      name: "MeeBot Starter",
      category: "กลุ่ม",
      power: 50,
      rarity: "Common",
      image: "🤖",
      ipfsHash: "QmXxX...",
      unlocked: true,
      cardType: "support",
      subWallet: null
    },
    {
      id: 2,
      name: "Lightning Strike",
      category: "นักเตะ",
      power: 85,
      rarity: "Rare", 
      image: "⚡",
      ipfsHash: "QmYyY...",
      unlocked: true,
      cardType: "attack",
      subWallet: null
    },
    {
      id: 3,
      name: "Power Boost",
      category: "บูสต์",
      power: 120,
      rarity: "Epic",
      image: "🔋",
      ipfsHash: "QmZzZ...",
      unlocked: true,
      cardType: "boost",
      subWallet: null
    },
    {
      id: 4,
      name: "Goal Keeper",
      category: "ลูกโกล",
      power: 95,
      rarity: "Rare",
      image: "🥅",
      ipfsHash: "QmAaA...",
      unlocked: true,
      cardType: "defense",
      subWallet: null
    },
    {
      id: 5,
      name: "Speed Runner",
      category: "ปราบ",
      power: 75,
      rarity: "Common",
      image: "🏃",
      ipfsHash: "QmBbB...",
      unlocked: true,
      cardType: "speed",
      subWallet: null
    }
  ];

  // Mission requirements
  const missionRequirements = {
    level1: {
      name: "ภารกิจเลเวล 1",
      requiredCards: ["defense", "speed"],
      requiredAmount: 2,
      description: "ลากการ์ด ลูกโกล และ ปราบ มาวางใน Sub-Wallet"
    },
    level2: {
      name: "ภารกิจเลเวล 2", 
      requiredCards: ["attack", "boost"],
      requiredAmount: 2,
      description: "ลากการ์ด นักเตะ และ บูสต์ มาวางใน Sub-Wallet"
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        setNftCards(mockNFTCards);
        
        // Initialize token balances
        setTokenBalances({
          MEE: 150,
          T2P: 500,
          USDC: 25,
          BNB: 0.1
        });
        
        setMeeBotMessage("เยี่ยม! เชื่อม Wallet สำเร็จแล้ว ตอนนี้ลองลากการ์ดเข้า Sub-Wallet หรือทดลอง Bridge T2P กันเลยนะคะ!");
      } else {
        alert('Please install MetaMask to connect your wallet!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setNftCards([]);
    setSubWallets({});
    setTokenBalances({
      MEE: 0,
      T2P: 0,
      USDC: 0,
      BNB: 0
    });
    setBridgeHistory([]);
    setMeeBotMessage("สวัสดีคะ! เชื่อมต่อ Wallet เพื่อเริ่มใช้งาน MeeChain กันเลยนะ!");
  };

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, missionId) => {
    e.preventDefault();
    if (!draggedCard) return;

    const mission = missionRequirements[missionId];
    if (!mission) return;

    // Check if card type matches mission requirements
    if (!mission.requiredCards.includes(draggedCard.cardType)) {
      setMeeBotMessage(`อ๊ะ! การ์ด ${draggedCard.name} ไม่ตรงกับภารกิจนี้นะคะ ลองดูการ์ดอื่นสิ 🤔`);
      setDraggedCard(null);
      return;
    }

    // Check if sub-wallet already has this card type
    const currentSubWallet = subWallets[missionId] || [];
    const hasCardType = currentSubWallet.some(card => card.cardType === draggedCard.cardType);
    
    if (hasCardType) {
      setMeeBotMessage(`การ์ดประเภทนี้มีใน Sub-Wallet แล้วนะคะ ลองเอาการ์ดประเภทอื่นมาสิ! 😊`);
      setDraggedCard(null);
      return;
    }

    // Add card to sub-wallet
    const updatedSubWallet = [...currentSubWallet, draggedCard];
    setSubWallets(prev => ({
      ...prev,
      [missionId]: updatedSubWallet
    }));

    // Remove card from main inventory
    setNftCards(prev => prev.filter(card => card.id !== draggedCard.id));

    // Check if mission is completed
    if (updatedSubWallet.length >= mission.requiredAmount) {
      const newQuestProgress = questProgress + 1;
      setQuestProgress(newQuestProgress);
      setExperiencePoints(prev => prev + 100);
      
      // Add badge to unlocked badges
      const newBadge = {
        id: Date.now(),
        name: `${mission.name} Master`,
        type: missionId,
        earned: new Date().toLocaleString('th-TH')
      };
      setUnlockedBadges(prev => [...prev, newBadge]);
      
      // Check if onboarding is complete
      if (newQuestProgress >= totalQuests) {
        setIsOnboardingComplete(true);
        setPlayerLevel(2);
        setMeeBotMessage(`🎊 CONGRATULATIONS, CYBER WARRIOR! 🎊 คุณได้ปลดล็อก CyberQuest Onboarding สำเร็จแล้ว! ยินดีต้อนรับสู่โลก MeeChain! 🌟`);
      } else {
        setMeeBotMessage(`🎉 QUEST COMPLETED! ปลดล็อก ${mission.name} สำเร็จแล้ว! ได้รับ 100 EXP + Badge ใหม่! Progress: ${newQuestProgress}/${totalQuests} 💰✨`);
      }
    } else {
      const remaining = mission.requiredAmount - updatedSubWallet.length;
      setMeeBotMessage(`⚡ NICE MOVE! เหลืออีก ${remaining} การ์ดก็ปลดล็อกภารกิจได้แล้ว! Keep going, Cyber Warrior! 🚀`);
    }

    setDraggedCard(null);
  };

  const removeFromSubWallet = (missionId, cardId) => {
    const subWallet = subWallets[missionId] || [];
    const cardToRemove = subWallet.find(card => card.id === cardId);
    
    if (cardToRemove) {
      // Remove from sub-wallet
      setSubWallets(prev => ({
        ...prev,
        [missionId]: subWallet.filter(card => card.id !== cardId)
      }));

      // Add back to main inventory
      setNftCards(prev => [...prev, cardToRemove]);
      setMeeBotMessage(`การ์ด ${cardToRemove.name} ถูกเอาออกจาก Sub-Wallet แล้วคะ!`);
    }
  };

  const verifyExternalNFT = async () => {
    // Mock external NFT verification
    setMeeBotMessage("🔍 กำลังตรวจสอบ NFT ภายนอก... พบการ์ดจาก OpenSea ที่มีพลัง 90! สามารถใช้ในภารกิจได้เลยคะ! ✨");
  };

  // Bridge functions
  const initiateBridge = async () => {
    if (!bridgeAmount || parseFloat(bridgeAmount) <= 0) {
      setMeeBotMessage("❌ กรุณากรอกจำนวน T2P ที่ต้องการ Bridge ให้ถูกต้อง");
      return;
    }

    if (tokenBalances.T2P < parseFloat(bridgeAmount)) {
      setMeeBotMessage("❌ T2P ไม่เพียงพอสำหรับการ Bridge");
      return;
    }

    // Simulate bridge transaction
    setMeeBotMessage(`🌉 กำลัง Bridge ${bridgeAmount} T2P จาก ${bridgeFromChain} ไป ${bridgeToChain}...`);

    setTimeout(() => {
      // Update token balances
      setTokenBalances(prev => ({
        ...prev,
        T2P: prev.T2P - parseFloat(bridgeAmount)
      }));

      // Add to bridge history
      const bridgeRecord = {
        id: Date.now(),
        amount: bridgeAmount,
        fromChain: bridgeFromChain,
        toChain: bridgeToChain,
        status: 'completed',
        txHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
        timestamp: new Date().toLocaleString('th-TH')
      };

      setBridgeHistory(prev => [bridgeRecord, ...prev.slice(0, 4)]);
      setMeeBotMessage(`✅ Bridge สำเร็จ! ${bridgeAmount} T2P ถูกส่งไป ${bridgeToChain} แล้ว 🎉`);
      setBridgeAmount('');
    }, 3000);
  };

  const claimTokens = (tokenType) => {
    const amounts = {
      MEE: 50,
      T2P: 100,
      USDC: 10
    };

    setTokenBalances(prev => ({
      ...prev,
      [tokenType]: prev[tokenType] + amounts[tokenType]
    }));

    setMeeBotMessage(`🎁 ได้รับ ${amounts[tokenType]} ${tokenType} แล้วคะ!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white flex flex-col items-center justify-center overflow-hidden relative">
        {/* Background animated particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="text-center z-10 px-6">
          {/* MEECHAIN Title */}
          <h1 className="text-6xl font-bold mb-4 tracking-wider animate-fadeInUp">
            MEECHAIN
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-blue-200 mb-2 animate-fadeInUp animation-delay-500">
            Where Play Meets Web3
          </p>

          <p className="text-2xl font-semibold text-cyan-300 mb-12 animate-fadeInUp animation-delay-1000">
            Play, Earn, Connect
          </p>

          {/* Enhanced MeeBot Character */}
          <div className="mb-12 animate-bounce animation-delay-1500">
            <div className="w-48 h-48 mx-auto relative">
              {/* Robot body with glow effect */}
              <div className="w-40 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-2 shadow-2xl relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-lg opacity-30 animate-pulse"></div>

                {/* Robot head */}
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2 shadow-xl relative z-10">
                  {/* Eyes with animation */}
                  <div className="flex justify-center items-center pt-8 space-x-4">
                    <div className="w-4 h-4 bg-cyan-300 rounded-full animate-ping"></div>
                    <div className="w-4 h-4 bg-cyan-300 rounded-full animate-ping animation-delay-500"></div>
                  </div>
                  {/* Smile */}
                  <div className="w-10 h-6 border-3 border-cyan-300 rounded-b-full mx-auto mt-2"></div>
                  {/* Antenna */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-8 bg-cyan-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-cyan-300 rounded-full -mt-2 animate-ping"></div>
                  </div>
                </div>

                {/* Arms with wave animation */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-16 bg-cyan-500 rounded-full animate-wave"></div>
                </div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-16 bg-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Call to action */}
          <div className="space-y-4 mb-8">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeInUp animation-delay-2000">
              🚀 Start Your Quest
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="block mx-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeInUp animation-delay-2500"
            >
              📱 QR Login
            </button>
          </div>

          {/* Enhanced bottom info */}
          <div className="space-y-6 animate-fadeInUp animation-delay-3000">
            <p className="text-blue-200 text-lg font-semibold">
              Join the Alliance Today
            </p>

            {/* Blockchain info */}
            <div className="bg-blue-800/20 backdrop-blur-sm rounded-2xl p-4 border border-cyan-400/30">
              <h3 className="text-cyan-300 font-bold mb-2">⛓️ Blockchain Powered</h3>
              <div className="text-sm space-y-1">
                <p>🏗️ Modular Chain Architecture</p>
                <p>🎴 NFT Cards & IPFS Integration</p>
                <p>🎯 Smart Contract Missions</p>
                <p>🔄 Sub-Wallet System</p>
              </div>
            </div>

            {/* Social links enhanced */}
            <div className="space-y-3 text-sm text-blue-300">
              <div className="flex items-center justify-center space-x-6">
                <span className="flex items-center"><span className="mr-2">🌐</span>www.meechain.xyz</span>
                <span className="flex items-center"><span className="mr-2">🐦</span>@meechain_xyz</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">💬</span>meechain_xyz/discord
              </div>
            </div>

            {/* Loading progress */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>

            <p className="text-xs text-blue-400 animate-pulse">
              Initializing Sub-Wallet System...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl p-8 max-w-sm w-full border border-cyan-400/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🔐 QR Login</h3>
              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
                <div className="text-6xl">📱</div>
              </div>
              <p className="text-blue-200 mb-6">
                Scan with MeeChain mobile app to login instantly
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm border-b border-blue-400/20">
        <span className="font-medium">{currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-2">
          <span className="font-medium">MeeChain</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <span className="ml-2">🔋</span>
          </div>
        </div>
      </div>

      {/* Wallet Connection Section */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Discover</h1>
          <div className="flex items-center space-x-2">
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
              >
                🔗 Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-xs">
                  <span className="text-green-400">● Connected</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-500/20 border border-red-400 px-2 py-1 rounded-lg text-xs hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Info */}
        {walletConnected && (
          <div className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-4 mb-6 border border-cyan-400/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-blue-200">Wallet Address</p>
                <p className="font-mono text-xs">{walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">NFT Cards</p>
                <p className="text-2xl font-bold">{nftCards.length}</p>
              </div>
            </div>
            
            {/* Quick Token Balance */}
            <div className="flex justify-between items-center pt-3 border-t border-blue-400/20">
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <span className="mr-1">🤖</span>
                  <span>{tokenBalances.MEE}</span>
                </span>
                <span className="flex items-center">
                  <span className="mr-1">🎮</span>
                  <span>{tokenBalances.T2P}</span>
                </span>
                <span className="flex items-center">
                  <span className="mr-1">💵</span>
                  <span>{tokenBalances.USDC}</span>
                </span>
              </div>
              <button 
                onClick={() => setSelectedTab('tokens')}
                className="text-cyan-400 hover:text-cyan-300 text-xs"
              >
                ดูทั้งหมด →
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {['missions', 'cards', 'subwallet', 'tokens', 'bridge'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                selectedTab === tab
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-blue-800/30 text-blue-200 hover:bg-blue-700/50'
              }`}
            >
              {tab === 'missions' ? '🎯 Missions' : 
               tab === 'cards' ? '🎴 NFT Cards' : 
               tab === 'subwallet' ? '🔄 Sub-Wallet' :
               tab === 'tokens' ? '💰 Tokens' :
               '🌉 Bridge'}
            </button>
          ))}
        </div>

        {/* Tokens Tab */}
        {selectedTab === 'tokens' && walletConnected && (
          <div className="space-y-6 mb-8">
            {/* Token Balances */}
            <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-3xl p-6 border border-cyan-400/30">
              <h3 className="text-xl font-bold mb-4">💰 ยอดคงเหลือ</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(tokenBalances).map(([token, balance]) => (
                  <div key={token} className="bg-blue-900/50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">
                      {token === 'MEE' ? '🤖' : 
                       token === 'T2P' ? '🎮' : 
                       token === 'USDC' ? '💵' : '🟡'}
                    </div>
                    <h4 className="font-bold">{token}</h4>
                    <p className="text-2xl font-bold text-cyan-300">{balance.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Token Faucet */}
            <div className="bg-gradient-to-r from-green-800 to-emerald-800 rounded-3xl p-6 border border-green-400/30">
              <h3 className="text-xl font-bold mb-4">💧 รับ Token ทดลอง</h3>
              <p className="text-green-200 mb-4">รับ Token สำหรับทดลองใช้งาน (ทุก 24 ชั่วโมง)</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => claimTokens('MEE')}
                  className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-xl font-bold transition-colors"
                >
                  🤖 รับ 50 MEE
                </button>
                <button 
                  onClick={() => claimTokens('T2P')}
                  className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-xl font-bold transition-colors"
                >
                  🎮 รับ 100 T2P
                </button>
              </div>
            </div>

            {/* Multi-chain Support */}
            <div className="bg-gradient-to-r from-orange-800 to-red-800 rounded-3xl p-6 border border-orange-400/30">
              <h3 className="text-xl font-bold mb-4">🌐 Multi-chain Support</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-orange-900/50 rounded-xl p-3">
                  <div className="text-2xl mb-2">⛽</div>
                  <p className="text-sm">MintMe</p>
                  <p className="text-xs text-orange-300">Native Chain</p>
                </div>
                <div className="bg-orange-900/50 rounded-xl p-3">
                  <div className="text-2xl mb-2">🟡</div>
                  <p className="text-sm">BSC</p>
                  <p className="text-xs text-orange-300">BEP-20</p>
                </div>
                <div className="bg-orange-900/50 rounded-xl p-3">
                  <div className="text-2xl mb-2">🟣</div>
                  <p className="text-sm">Polygon</p>
                  <p className="text-xs text-orange-300">ERC-20</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bridge Tab */}
        {selectedTab === 'bridge' && walletConnected && (
          <div className="space-y-6 mb-8">
            {/* MeeBot Bridge Assistant */}
            <div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-3xl p-6 border border-purple-400/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">🌉</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">MeeBot Bridge Assistant</h3>
                  <p className="text-purple-200 text-sm">Multi-chain Token Bridge</p>
                </div>
              </div>
              <div className="bg-purple-900/50 rounded-xl p-4">
                <p className="text-purple-100">{meeBotMessage}</p>
              </div>
            </div>

            {/* Bridge Interface */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-3xl p-6 border border-blue-400/30">
              <h3 className="text-xl font-bold mb-4">🌉 Cross-chain Bridge</h3>
              
              <div className="space-y-4">
                {/* From Chain */}
                <div>
                  <label className="block text-blue-200 text-sm mb-2">จาก Chain:</label>
                  <select 
                    value={bridgeFromChain}
                    onChange={(e) => setBridgeFromChain(e.target.value)}
                    className="w-full bg-blue-900/50 border border-blue-400/30 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="MintMe">MintMe Network</option>
                    <option value="BSC">Binance Smart Chain</option>
                    <option value="Polygon">Polygon Network</option>
                  </select>
                </div>

                {/* To Chain */}
                <div>
                  <label className="block text-blue-200 text-sm mb-2">ไป Chain:</label>
                  <select 
                    value={bridgeToChain}
                    onChange={(e) => setBridgeToChain(e.target.value)}
                    className="w-full bg-blue-900/50 border border-blue-400/30 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="BSC">Binance Smart Chain</option>
                    <option value="Polygon">Polygon Network</option>
                    <option value="MintMe">MintMe Network</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-blue-200 text-sm mb-2">จำนวน T2P:</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={bridgeAmount}
                      onChange={(e) => setBridgeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-blue-900/50 border border-blue-400/30 rounded-xl px-4 py-3 text-white pr-20"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                      ยอดคงเหลือ: {tokenBalances.T2P}
                    </div>
                  </div>
                </div>

                {/* Bridge Button */}
                <button 
                  onClick={initiateBridge}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  🌉 เริ่ม Bridge
                </button>

                {/* Bridge Info */}
                <div className="bg-blue-900/30 rounded-xl p-4 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-300">ค่าธรรมเนียม:</span>
                    <span>0.01 T2P</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">เวลาประมาณ:</span>
                    <span>5-10 นาที</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge History */}
            {bridgeHistory.length > 0 && (
              <div className="bg-gradient-to-r from-gray-800 to-slate-800 rounded-3xl p-6 border border-gray-400/30">
                <h3 className="text-xl font-bold mb-4">📊 ประวัติการ Bridge</h3>
                <div className="space-y-3">
                  {bridgeHistory.map((record) => (
                    <div key={record.id} className="bg-gray-900/50 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-green-400 text-lg">✅</span>
                          <span className="font-medium">{record.amount} T2P</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-300">{record.fromChain} → {record.toChain}</span>
                        </div>
                        <p className="text-xs text-gray-400">{record.timestamp}</p>
                        <p className="text-xs text-blue-300 font-mono">{record.txHash}</p>
                      </div>
                      <div className="text-green-400 text-sm font-medium">สำเร็จ</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-Wallet Tab */}
        {selectedTab === 'subwallet' && walletConnected && (
          <div className="space-y-6 mb-8">
            {/* MeeBot Assistant */}
            <div className="bg-gradient-to-r from-cyan-800 to-blue-800 rounded-3xl p-6 border border-cyan-400/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">MeeBot Assistant</h3>
                  <p className="text-blue-200 text-sm">Sub-Wallet Guide</p>
                </div>
              </div>
              <div className="bg-blue-900/50 rounded-xl p-4">
                <p className="text-blue-100">{meeBotMessage}</p>
              </div>
              <button
                onClick={verifyExternalNFT}
                className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                🔍 ตรวจสอบ NFT ภายนอก
              </button>
            </div>

            {/* Mission Sub-Wallets */}
            <div className="space-y-4">
              {Object.entries(missionRequirements).map(([missionId, mission]) => {
                const currentCards = subWallets[missionId] || [];
                const isCompleted = currentCards.length >= mission.requiredAmount;
                
                return (
                  <div
                    key={missionId}
                    className={`bg-gradient-to-r rounded-3xl p-6 border-2 border-dashed transition-all ${
                      isCompleted 
                        ? 'from-green-800 to-emerald-800 border-green-400' 
                        : 'from-blue-800/50 to-purple-800/50 border-cyan-400/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, missionId)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{mission.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500/30 text-blue-200'
                        }`}>
                          {currentCards.length}/{mission.requiredAmount}
                        </span>
                        {isCompleted && <span className="text-green-400">✅</span>}
                      </div>
                    </div>
                    
                    <p className="text-blue-200 text-sm mb-4">{mission.description}</p>
                    
                    {/* Drop Zone */}
                    <div className="grid grid-cols-2 gap-3 min-h-[120px]">
                      {currentCards.map((card) => (
                        <div
                          key={card.id}
                          className="bg-blue-900/50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-800/50 transition-colors"
                          onClick={() => removeFromSubWallet(missionId, card.id)}
                        >
                          <div className="text-2xl">{card.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{card.name}</h4>
                            <p className="text-xs text-blue-300">⚡ {card.power}</p>
                          </div>
                          <span className="text-red-400 hover:text-red-300">✕</span>
                        </div>
                      ))}
                      
                      {/* Empty slots */}
                      {Array(mission.requiredAmount - currentCards.length).fill(0).map((_, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-900/20 border-2 border-dashed border-blue-400/30 rounded-xl p-3 flex items-center justify-center text-blue-400/50"
                        >
                          <span className="text-sm">วางการ์ดที่นี่</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NFT Inventory for Drag & Drop */}
            <div className="bg-blue-800/50 rounded-3xl p-6 border border-cyan-400/30">
              <h3 className="text-xl font-bold mb-4">🎴 NFT Inventory</h3>
              <div className="grid grid-cols-2 gap-3">
                {nftCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card)}
                    className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform border border-cyan-400/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{card.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{card.name}</h4>
                        <p className="text-xs text-blue-200">{card.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-yellow-500/20 border border-yellow-400 px-2 py-0.5 rounded text-xs">
                            ⚡ {card.power}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            card.rarity === 'Epic' ? 'bg-purple-500/20 border border-purple-400' :
                            card.rarity === 'Rare' ? 'bg-blue-500/20 border border-blue-400' :
                            'bg-gray-500/20 border border-gray-400'
                          }`}>
                            {card.rarity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {nftCards.length === 0 && (
                <p className="text-center text-blue-300 py-8">
                  การ์ดทั้งหมดถูกวางใน Sub-Wallet แล้ว
                </p>
              )}
            </div>
          </div>
        )}

        {/* NFT Cards Display */}
        {selectedTab === 'cards' && walletConnected && (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold mb-4">🎴 Your NFT Collection</h2>
            <div className="grid grid-cols-1 gap-4">
              {[...nftCards, ...Object.values(subWallets).flat()].map((card) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-br from-blue-800 to-purple-800 border-cyan-400/50 shadow-lg rounded-2xl p-4 border-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{card.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold">{card.name}</h3>
                      <p className="text-sm text-blue-200">{card.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-yellow-500/20 border border-yellow-400 px-2 py-1 rounded text-xs">
                          ⚡ {card.power}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          card.rarity === 'Epic' ? 'bg-purple-500/20 border border-purple-400' :
                          card.rarity === 'Rare' ? 'bg-blue-500/20 border border-blue-400' :
                          'bg-gray-500/20 border border-gray-400'
                        }`}>
                          {card.rarity}
                        </span>
                      </div>
                      <p className="text-xs text-green-400 mt-1">
                        📦 IPFS: {card.ipfsHash}
                      </p>
                      {card.subWallet && (
                        <p className="text-xs text-cyan-400 mt-1">
                          🔄 In Sub-Wallet: {card.subWallet}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Missions Section */}
        {selectedTab === 'missions' && (
          <>
            {/* CyberQuest Progress Header */}
            <div className="bg-gradient-to-r from-cyan-800 via-blue-800 to-purple-800 rounded-3xl p-6 mb-6 border-2 border-cyan-400/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">
                      🌟 CYBERQUEST ONBOARDING
                    </h2>
                    <p className="text-cyan-200 text-sm">Level {playerLevel} • {experiencePoints} EXP</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-bold">
                      {questProgress}/{totalQuests} QUESTS
                    </div>
                    {isOnboardingComplete && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-black mt-2 animate-bounce">
                        🏆 COMPLETED!
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar with Glow Effect */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-cyan-300 mb-2">
                    <span>Quest Progress</span>
                    <span>{Math.round((questProgress / totalQuests) * 100)}%</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out relative animate-pulse"
                      style={{ width: `${(questProgress / totalQuests) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-50 animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* Badge Collection */}
                {unlockedBadges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-cyan-300 mr-2">Unlocked Badges:</span>
                    {unlockedBadges.map((badge) => (
                      <div key={badge.id} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 px-2 py-1 rounded-full text-xs animate-bounce">
                        🏅 {badge.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Missions Card */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">🎯 Smart Contract Missions</h2>
                <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-sm">
                  <span>📍</span>
                  <span>Blockchain</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-700/50 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Connect Wallet</span>
                    <span className="text-green-400">✅</span>
                  </div>
                  <p className="text-xs text-blue-200">Reward: MeeBot Starter NFT</p>
                </div>
                <div className="bg-blue-700/50 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Use Sub-Wallet System</span>
                    <span className="text-yellow-400">⏳</span>
                  </div>
                  <p className="text-xs text-blue-200">Reward: 200 MEE Tokens</p>
                </div>
                <div className="bg-blue-700/50 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Complete Mission Level 1</span>
                    <span className="text-yellow-400">⏳</span>
                  </div>
                  <p className="text-xs text-blue-200">Reward: Rare NFT Card</p>
                </div>
              </div>
            </div>

            {/* MeeBot CyberQuest Academy Card */}
            <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-blue-900 rounded-3xl p-6 mb-8 border-2 border-cyan-400/50 relative overflow-hidden">
              {/* Hologram Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse animation-delay-500"></div>
                <div className="absolute top-1/2 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse animation-delay-1500"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text mb-1">
                    🤖 MEEBOT
                  </h2>
                  <h3 className="text-xl font-bold text-cyan-200 mb-2">CYBERQUEST MENTOR</h3>
                  <div className="text-xs text-cyan-400 font-mono">SYSTEM_STATUS: ONLINE</div>
                </div>

                {/* Enhanced MeeBot Hologram Character */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce relative overflow-hidden">
                      {/* Hologram scan lines */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-8 animate-pulse"></div>
                      <div className="text-4xl relative z-10">🤖</div>
                    </div>
                    {/* Hologram glow effect */}
                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-lg animate-pulse"></div>
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-2 w-1 h-1 bg-purple-300 rounded-full animate-ping animation-delay-1000"></div>
                  </div>
                </div>

                {/* MeeBot Speech Bubble */}
                <div className="bg-gradient-to-r from-cyan-800/50 to-blue-800/50 rounded-xl p-4 mb-4 border border-cyan-400/30 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-800/50 rotate-45 border-t border-l border-cyan-400/30"></div>
                  <p className="text-center text-cyan-100 text-sm leading-relaxed">
                    {meeBotMessage}
                  </p>
                </div>

                {/* CyberQuest Features Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gradient-to-br from-cyan-700/30 to-blue-700/30 rounded-lg p-3 text-center border border-cyan-400/20 hover:border-cyan-400/50 transition-all hover:scale-105">
                    <div className="text-lg mb-1">🔄</div>
                    <div className="font-medium">Sub-Wallet</div>
                    <div className="text-cyan-300 text-xs">Quantum Storage</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-700/30 to-blue-700/30 rounded-lg p-3 text-center border border-purple-400/20 hover:border-purple-400/50 transition-all hover:scale-105">
                    <div className="text-lg mb-1">🎴</div>
                    <div className="font-medium">Drag & Drop</div>
                    <div className="text-purple-300 text-xs">Neural Interface</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-700/30 to-blue-700/30 rounded-lg p-3 text-center border border-green-400/20 hover:border-green-400/50 transition-all hover:scale-105">
                    <div className="text-lg mb-1">🔍</div>
                    <div className="font-medium">Auto Verify</div>
                    <div className="text-green-300 text-xs">AI Scanner</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-700/30 to-blue-700/30 rounded-lg p-3 text-center border border-orange-400/20 hover:border-orange-400/50 transition-all hover:scale-105">
                    <div className="text-lg mb-1">🌐</div>
                    <div className="font-medium">External NFT</div>
                    <div className="text-orange-300 text-xs">Cross-Chain</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105">
                    🚀 Start Quest
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105">
                    📊 View Stats
                  </button>
                </div>
              </div>

              {/* Background decorations */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/10 rounded-full"></div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900/90 backdrop-blur-lg border-t border-blue-400/20">
        <div className="flex justify-around items-center py-3 px-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-blue-900 text-xs">🏠</span>
            </div>
            <span className="text-xs text-white">Home</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-blue-300 text-xs">💬</span>
            </div>
            <span className="text-xs text-blue-300">Message</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-cyan-400 text-xs">🎯</span>
            </div>
            <span className="text-xs text-cyan-400">MeeChain</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-blue-300 text-xs">👤</span>
            </div>
            <span className="text-xs text-blue-300">Profile</span>
          </div>
        </div>
      </div>

      {/* Enhanced CyberQuest MeeBot floating assistant */}
      <div className="fixed bottom-20 right-6 z-50">
        <div className="relative">
          {/* Main MeeBot hologram */}
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce cursor-pointer hover:scale-110 transition-transform relative overflow-hidden border-2 border-cyan-300/50">
            {/* Hologram scan effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-6 animate-pulse"></div>
            <span className="text-2xl relative z-10">🤖</span>
          </div>
          
          {/* Hologram glow */}
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full blur-lg animate-pulse"></div>
          
          {/* Status indicators */}
          {walletConnected && (
            <>
              <div className="absolute -top-2 -right-2 bg-green-400 w-5 h-5 rounded-full animate-ping flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              {questProgress > 0 && (
                <div className="absolute -top-1 -left-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-xs font-bold text-black animate-bounce">
                  {questProgress}
                </div>
              )}
            </>
          )}
          
          {isOnboardingComplete && (
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center animate-spin">
              <span className="text-xs">🏆</span>
            </div>
          )}
          
          {/* Floating particles */}
          <div className="absolute -top-4 -left-2 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 right-0 w-1 h-1 bg-purple-300 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute top-0 right-2 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-500"></div>
        </div>
      </div>
    </div>
  );
}
