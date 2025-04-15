import React, { useState } from 'react';
import { Globe2 } from 'lucide-react';
import { epochs, decisions } from './data/gameData';
import type { GameState, Decision } from './types';
import Dashboard from './components/Dashboard';
import FinalScoreModal from './components/FinalScoreModal';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentEpoch: epochs[0],
    co2Level: 280,
    biodiversity: 100,
    seaLevel: 0,
    temperature: 14,
    year: -70000,
    career: null,
    lastDecision: null,
  });

  const [showFinalScore, setShowFinalScore] = useState(false);

  const handleDecision = (decision: Decision) => {
    setGameState((prev: GameState) => {
      const newState = {
        ...prev,
        co2Level: prev.co2Level + decision.impacts.co2,
        biodiversity: Math.max(0, Math.min(100, prev.biodiversity + decision.impacts.biodiversity)),
        seaLevel: prev.seaLevel + decision.impacts.seaLevel,
        temperature: prev.temperature + decision.impacts.temperature,
        year: decision.year,
        lastDecision: decision,
        currentEpoch: epochs.find(epoch => 
          decision.year >= epoch.startYear && decision.year <= epoch.endYear
        ) || prev.currentEpoch,
      };

      // Check if this was the last decision
      const remainingDecisions = decisions.filter(d => d.year > decision.year);
      if (remainingDecisions.length === 0) {
        setTimeout(() => setShowFinalScore(true), 1000);
      }

      return newState;
    });
  };

  const availableDecisions = decisions
    .filter(d => d.year > gameState.year)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Epoch Shift
            </h1>
          </div>
          <div className="text-sm text-slate-400">
            The Game of Human Earth
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Timeline</h2>
              <div className="space-y-6">
                {epochs.map((epoch, index) => (
                  <div
                    key={epoch.id}
                    className={`relative ${
                      index !== epochs.length - 1 ? 'pb-6 border-l-2 border-slate-700 ml-4' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`
                        absolute -left-[9px] w-4 h-4 rounded-full border-2
                        ${gameState.currentEpoch.id === epoch.id 
                          ? 'bg-emerald-500 border-emerald-400' 
                          : 'bg-slate-800 border-slate-600'}
                      `} />
                      <div className="ml-8">
                        <div className="font-semibold text-lg">
                          {epoch.name}
                        </div>
                        <div className="text-sm text-slate-400 mb-1">
                          {epoch.startYear < 0 ? Math.abs(epoch.startYear) + ' BCE' : epoch.startYear + ' CE'}
                        </div>
                        <p className="text-slate-300">
                          {epoch.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Available Decisions</h2>
              <div className="space-y-4">
                {availableDecisions.map(decision => (
                  <button
                    key={decision.id}
                    onClick={() => handleDecision(decision)}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors rounded-lg p-4 text-left"
                  >
                    <h3 className="text-lg font-semibold mb-2">{decision.title}</h3>
                    <p className="text-slate-300 mb-3">{decision.description}</p>
                    <div className="text-sm text-slate-400">
                      Year: {decision.year < 0 ? Math.abs(decision.year) + ' BCE' : decision.year + ' CE'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <Dashboard
            co2Level={gameState.co2Level}
            biodiversity={gameState.biodiversity}
            seaLevel={gameState.seaLevel}
            temperature={gameState.temperature}
            year={gameState.year}
            lastDecision={gameState.lastDecision}
          />
        </div>
      </main>

      {/* Final Score Modal */}
      {showFinalScore && (
        <FinalScoreModal
          gameState={gameState}
          onClose={() => setShowFinalScore(false)}
        />
      )}
    </div>
  );
}

export default App;