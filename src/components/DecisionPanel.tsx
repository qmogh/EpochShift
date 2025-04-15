import React from 'react';
import type { Decision } from '../types';

interface DecisionPanelProps {
  decisions: Decision[];
  currentYear: number;
  onDecision: (decision: Decision) => void;
}

const DecisionPanel: React.FC<DecisionPanelProps> = ({
  decisions,
  currentYear,
  onDecision,
}) => {
  const availableDecisions = decisions.filter(
    d => d.year > currentYear
  ).slice(0, 3);

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Critical Decisions</h2>
      <div className="space-y-4">
        {availableDecisions.map(decision => (
          <div
            key={decision.id}
            className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer"
            onClick={() => onDecision(decision)}
          >
            <h3 className="text-lg font-semibold mb-2">{decision.title}</h3>
            <p className="text-gray-300 mb-3">{decision.description}</p>
            <div className="text-sm text-gray-400">
              Year: {decision.year < 0 ? `${Math.abs(decision.year)} BCE` : `${decision.year} CE`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};