export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-green-600/20" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            MeeChain
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Web3 wallet designed for Thai users with NFT, Gaming and DeFi features
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Core Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-yellow-500">💰</div>
                <h3 className="text-xl font-bold mb-2 text-white">MeeToken</h3>
              </div>
              <p className="text-sm text-slate-400 text-center">
                Earn MEE tokens for completing quests and upgrading NFTs
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-blue-500">🏆</div>
                <h3 className="text-xl font-bold mb-2 text-white">NFT Badges</h3>
              </div>
              <p className="text-sm text-slate-400 text-center">
                Collect Badge NFTs from quests and upgrade rarity levels
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-cyan-500">✨</div>
                <h3 className="text-xl font-bold mb-2 text-white">MeeBot AI</h3>
              </div>
              <p className="text-sm text-slate-400 text-center">
                AI Assistant to help guide your Web3 journey
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-green-500">👥</div>
                <h3 className="text-xl font-bold mb-2 text-white">Community</h3>
              </div>
              <p className="text-sm text-slate-400 text-center">
                Join MeeChain community and earn rewards from activities
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
