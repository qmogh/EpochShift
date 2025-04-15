import React from 'react';
import { Globe2 } from 'lucide-react';

const GameHeader: React.FC = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe2 className="w-8 h-8 text-emerald-400" />
          <h1 className="text-2xl font-bold">Epoch Shift</h1>
        </div>
        <div className="text-sm text-gray-400">
          The Game of Human Earth
        </div>
      </div>
    </header>
  );
};