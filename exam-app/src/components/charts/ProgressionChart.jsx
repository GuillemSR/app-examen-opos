import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProgressionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Progresión de Resultados
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
      return (
        <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{examData?.fecha}</p>
          <p className="text-green-600">Correctas: {examData?.correctas}</p>
          <p className="text-red-600">Incorrectas: {examData?.incorrectas}</p>
          <p className="text-gray-600 dark:text-slate-300">Sin responder: {examData?.sinResponder}</p>
          <p className="text-blue-600 font-semibold mt-1">Porcentaje: {examData?.porcentaje}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Progresión de Resultados
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 20]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="correctas"
              name="Correctas"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="incorrectas"
              name="Incorrectas"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="sinResponder"
              name="Sin Responder"
              stroke="#6b7280"
              strokeWidth={2}
              dot={{ fill: '#6b7280', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressionChart;
