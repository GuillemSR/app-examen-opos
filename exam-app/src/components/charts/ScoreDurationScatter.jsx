import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis
} from 'recharts';

const ScoreDurationScatter = ({ data, unansweredData }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Relación Duración vs Puntuación
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-slate-400">
          No hay datos suficientes
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const examData = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600">
          <p className="font-semibold text-gray-900 dark:text-white">{examData?.name}</p>
          <p className="text-blue-600">Duración: {examData?.duracion} min</p>
          <p className="text-purple-600">Puntuación: {examData?.puntuacion} pts</p>
          <p className="text-green-600">Porcentaje: {examData?.porcentaje}%</p>
        </div>
      );
    }
    return null;
  };

  const UnansweredTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const examData = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600">
          <p className="font-semibold text-gray-900 dark:text-white">{examData?.name}</p>
          <p className="text-blue-600">Duración: {examData?.duracion} min</p>
          <p className="text-gray-600 dark:text-slate-300">Sin responder: {examData?.sinResponder}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Duración vs Puntuación */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Duración vs Puntuación
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number" 
                dataKey="duracion" 
                name="Duración" 
                unit=" min"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 30]}
              />
              <YAxis 
                type="number" 
                dataKey="puntuacion" 
                name="Puntuación" 
                unit=" pts"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 20]}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                data={data} 
                fill="#8b5cf6"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 text-center">
          Cada punto representa un examen. Eje X: tiempo usado, Eje Y: puntuación obtenida.
        </p>
      </div>

      {/* Duración vs Sin Responder */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Duración vs Preguntas Sin Responder
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number" 
                dataKey="duracion" 
                name="Duración" 
                unit=" min"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 30]}
              />
              <YAxis 
                type="number" 
                dataKey="sinResponder" 
                name="Sin Responder"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 20]}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<UnansweredTooltip />} />
              <Scatter 
                data={unansweredData} 
                fill="#f97316"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 text-center">
          Relación entre tiempo usado y preguntas dejadas sin responder.
        </p>
      </div>
    </div>
  );
};

export default ScoreDurationScatter;
