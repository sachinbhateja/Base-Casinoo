export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">🎰 Base Casino</h1>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">
          Connect Wallet
        </button>
      </header>

      {/* Navigation */}
      <nav className="flex gap-3 px-6 py-4 border-b border-slate-800">
        <NavButton label="Dashboard" />
        <NavButton label="Dice" />
        <NavButton label="Coin Flip" />
        <NavButton label="Roulette" />
      </nav>

      {/* Main Content */}
      <main className="p-10">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome to Base Casino 🎉
        </h2>
        <p className="text-slate-400">
          Entertainment-only casino using non-redeemable PLAY tokens.
        </p>
      </main>
    </div>
  );
}

function NavButton({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition">
      {label}
    </button>
  );
}


