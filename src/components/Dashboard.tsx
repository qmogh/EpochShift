import React from 'react';
import { Thermometer, Droplets, Leaf, Globe2, History } from 'lucide-react';
import type { Decision } from '../types';

interface DashboardProps {
  co2Level: number;
  biodiversity: number;
  seaLevel: number;
  temperature: number;
  year: number;
  lastDecision?: Decision | null;
}

const Dashboard: React.FC<DashboardProps> = ({
  co2Level,
  biodiversity,
  seaLevel,
  temperature,
  year,
  lastDecision,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Earth System Dashboard</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<Globe2 className="w-6 h-6" />}
            label="CO₂ Levels"
            value={`${co2Level} ppm`}
            status={co2Level > 350 ? 'warning' : 'normal'}
          />
          <MetricCard
            icon={<Leaf className="w-6 h-6" />}
            label="Biodiversity"
            value={`${biodiversity}%`}
            status={biodiversity < 50 ? 'warning' : 'normal'}
          />
          <MetricCard
            icon={<Droplets className="w-6 h-6" />}
            label="Sea Level"
            value={`+${Math.min(seaLevel, 10).toFixed(2)}m`}
            status={seaLevel > 1 ? 'warning' : 'normal'}
          />
          <MetricCard
            icon={<Thermometer className="w-6 h-6" />}
            label="Temperature"
            value={`${temperature.toFixed(1)}°C`}
            status={temperature > 15 ? 'warning' : 'normal'}
          />
        </div>
        <div className="text-center text-xl font-semibold mt-4">
          Year: {year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`}
        </div>
        {lastDecision && (
          <div className="mt-6 bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-6 h-6 text-emerald-400" />
              <span className="font-medium">Historical Impact</span>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold mb-1">{lastDecision.title}</p>
              <p className="text-sm">{lastDecision.historicalImpact}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'normal' | 'warning';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, status }) => {
  return (
    <div className="bg-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className={`text-xl font-bold ${
        status === 'warning' ? 'text-red-400' : 'text-emerald-400'
      }`}>
        {value}
      </div>
    </div>
  );
};

export default Dashboard;