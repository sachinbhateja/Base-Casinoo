import { useState } from "react";

type Game = "DASHBOARD" | "DICE" | "COINFLIP" | "ROULETTE";

export default function App() {
  const [activeGame, setActiveGame] = useState<Game>("DASHBOARD");

  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "white" }}>
      {/* HEADER */}
      <header
        style={{
          padding: 20,
          borderBottom: "1px solid #1f2937",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>🎰 Base Casino</h1>
        <button
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
          Connect Wallet (soon)
        </button>
      </header>

      {/* NAVIGATION */}
      <nav
        style={{
          display: "flex",
          gap: 12,
          padding: 16,
          borderBottom: "1px solid #1f2937",
        }}
      >
        <NavButton label="Dashboard" onClick={() => setActiveGame("DASHBOARD")} />
        <NavButton label="Dice" onClick={() => setActiveGame("DICE")} />
        <NavButton label="Coin Flip" onClick={() => setActiveGame("COINFLIP")} />
        <NavButton label="Roulette" onClick={() => setActiveGame("ROULETTE")} />
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: 40 }}>
        {activeGame === "DASHBOARD" && <h2>Welcome to Base Casino 🎉</h2>}
        {activeGame === "DICE" && <h2>🎲 Dice Game (UI coming)</h2>}
        {activeGame === "COINFLIP" && <h2>🪙 Coin Flip (UI coming)</h2>}
        {activeGame === "ROULETTE" && <h2>🎡 Roulette (UI coming)</h2>}
      </main>
    </div>
  );
}

function NavButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        background: "#111827",
        color: "white",
        border: "1px solid #374151",
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

