import React from 'react';
import ReactConfetti from 'react-confetti';
import type { GameState } from '../types';

interface FinalScoreModalProps {
  gameState: GameState;
  onClose: () => void;
}

const FinalScoreModal: React.FC<FinalScoreModalProps> = ({ gameState, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />
      <div className="bg-slate-800 rounded-xl p-8 max-w-2xl mx-4 relative">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Game Complete!
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="font-medium mb-2">CO₂ Levels</div>
              <div className="text-2xl font-bold text-emerald-400">
                {gameState.co2Level} ppm
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="font-medium mb-2">Biodiversity</div>
              <div className="text-2xl font-bold text-emerald-400">
                {gameState.biodiversity}%
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="font-medium mb-2">Sea Level Rise</div>
              <div className="text-2xl font-bold text-emerald-400">
                +{gameState.seaLevel.toFixed(2)}m
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="font-medium mb-2">Temperature</div>
              <div className="text-2xl font-bold text-emerald-400">
                {gameState.temperature.toFixed(1)}°C
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalScoreModal; 