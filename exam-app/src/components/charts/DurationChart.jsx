import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DurationChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Duración por Examen
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-slate-400">
          No hay datos suficientes
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const examData = payload[0]?.payload;
      const mins = Math.floor(examData?.duracionSegundos / 60);
      const secs = examData?.duracionSegundos % 60;
      return (
        <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{examData?.fecha}</p>
          <p className="text-blue-600 font-semibold">
            Duración: {mins}:{secs.toString().padStart(2, '0')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Duración por Examen (minutos)
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 30]}
              label={{ value: 'min', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="duracion"
              name="Duración"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorDuration)"
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DurationChart;
