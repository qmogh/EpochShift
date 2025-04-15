import React from 'react';
import type { Epoch } from '../types';

interface TimelineProps {
  epochs: Epoch[];
  currentEpoch: Epoch;
}

const Timeline: React.FC<TimelineProps> = ({ epochs, currentEpoch }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Timeline</h2>
      <div className="relative">
        {epochs.map((epoch, index) => (
          <div
            key={epoch.id}
            className={`flex items-center mb-4 ${
              currentEpoch.id === epoch.id ? 'text-emerald-400' : 'text-gray-400'
            }`}
          >
            <div className="w-24 text-sm">{epoch.startYear}</div>
            <div className="flex-1">
              <div className="font-semibold">{epoch.name}</div>
              <div className="text-sm opacity-75">{epoch.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}