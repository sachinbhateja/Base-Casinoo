import React, { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers'
import { createWeb3Modal } from '@web3modal/ethers/react'

import { GameType, WalletState, GameHistoryEntry } from './types'
import { DISCLAIMER_TEXT, BASE_CHAIN_ID } from './constants'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import DiceGame from './components/games/DiceGame'
import CoinFlipGame from './components/games/CoinFlipGame'
import RouletteGame from './components/games/RouletteGame'
import DisclaimerModal from './components/DisclaimerModal'

/* =========================
   WEB3MODAL CONFIG
   ========================= */
createWeb3Modal({
  projectId: '3a7da0e17dff1379fb78b841d26eb448',
  chains: [
    {
      chainId: 8453,
      name: 'Base',
      currency: 'ETH',
      explorerUrl: 'https://basescan.org',
      rpcUrl: 'https://mainnet.base.org'
    }
  ],
  ethersConfig: {
    defaultChainId: 8453,
    metadata: {
      name: 'Base Entertainment Casino',
      description: 'Entertainment-only casino using non-redeemable PLAY tokens',
      url: 'https://base-casino.vercel.app',
      icons: []
    }
  },
  themeMode: 'dark'
})

/* =========================
   APP
   ========================= */
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GameType | 'DASHBOARD'>('DASHBOARD')
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    ethBalance: '0',
    tokenBalance: '0',
    isConnected: false,
    chainId: null
  })

  const [history, setHistory] = useState<GameHistoryEntry[]>([])

  /* =========================
     CONNECT WALLET
     ========================= */
  const connectWallet = async () => {
    const ethereum = (window as any).ethereum
    if (!ethereum) {
      alert('No wallet detected. Please install MetaMask, Rabby, or OKX Wallet.')
      return
    }

    const provider = new BrowserProvider(ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const network = await provider.getNetwork()
    const balance = await provider.getBalance(accounts[0])

    setWallet({
      address: accounts[0],
      ethBalance: ethers.formatEther(balance),
      tokenBalance: '0',
      isConnected: true,
      chainId: Number(network.chainId)
    })
  }

  /* =========================
     BUY TOKEN (TEMP)
     ========================= */
  const purchaseTokens = async () => {
    alert('Wallet connected successfully. Token purchase will be enabled next.')
  }

  /* =========================
     GAME CALLBACK
     ========================= */
  const handleBet = useCallback(
    (betAmount: number, win: boolean, payout: number, game: GameType) => {
      const entry: GameHistoryEntry = {
        id: Math.random().toString(36).substring(2),
        game,
        bet: betAmount,
        result: win ? 'WIN' : 'LOSS',
        payout: win ? payout : 0,
        timestamp: Date.now()
      }
      setHistory(prev => [entry, ...prev].slice(0, 20))
    },
    []
  )

  /* =========================
     RENDER ACTIVE TAB
     ========================= */
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'DASHBOARD':
        return (
          <Dashboard
            wallet={wallet}
            history={history}
            onConnect={() => (window as any).openWeb3Modal()}
            onBuyTokens={purchaseTokens}
          />
        )

      case GameType.DICE:
        return (
          <DiceGame
            balance={Number(wallet.tokenBalance)}
            onBet={(a, w, p) => handleBet(a, w, p, GameType.DICE)}
          />
        )

      case GameType.COIN_FLIP:
        return (
          <CoinFlipGame
            balance={Number(wallet.tokenBalance)}
            onBet={(a, w, p) => handleBet(a, w, p, GameType.COIN_FLIP)}
          />
        )

      case GameType.ROULETTE:
        return (
          <RouletteGame
            balance={Number(wallet.tokenBalance)}
            onBet={(a, w, p) => handleBet(a, w, p, GameType.ROULETTE)}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-gray-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header
          wallet={wallet}
          onConnect={() => (window as any).openWeb3Modal()}
        />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto casino-gradient">
          <div className="max-w-6xl mx-auto">
            {wallet.isConnected && wallet.chainId !== BASE_CHAIN_ID && (
              <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-xl text-yellow-200 text-sm">
                Please switch to Base Mainnet
              </div>
            )}

            {renderActiveComponent()}
          </div>
        </main>

        <footer className="p-4 bg-[#030712] border-t border-gray-800 text-center text-xs text-gray-500">
          <p>{DISCLAIMER_TEXT}</p>
          <p className="mt-1">© 2024 Base Entertainment Casino</p>
        </footer>
      </div>

      {showDisclaimer && (
        <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
      )}
    </div>
  )
}

export default App

}

export default App
>>>>>>> 2d9bba9 (Add Web3Modal multi-wallet support)
