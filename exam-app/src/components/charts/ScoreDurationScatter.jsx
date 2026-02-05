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

const ScoreCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const examData = payload[0]?.payload;
    return (
      <div className="card p-3 border border-border">
        <p className="font-semibold text-foreground">{examData?.name}</p>
        <p className="text-primary">Duración: {examData?.duracion} min</p>
        <p className="text-foreground">Puntuación: {examData?.puntuacion} pts</p>
        <p className="text-success">Porcentaje: {examData?.porcentaje}%</p>
      </div>
    );
  }
  return null;
};

const UnansweredCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const examData = payload[0]?.payload;
    return (
      <div className="card p-3 border border-border">
        <p className="font-semibold text-foreground">{examData?.name}</p>
        <p className="text-primary">Duración: {examData?.duracion} min</p>
        <p className="text-muted-foreground">Sin responder: {examData?.sinResponder}</p>
      </div>
    );
  }
  return null;
};

const ScoreDurationScatter = ({ data, unansweredData }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Relación Duración vs Puntuación
        </h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          No hay datos suficientes
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Duración vs Puntuación */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Duración vs Puntuación
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="rgb(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="duracion" 
                name="Duración" 
                unit=" min"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
                domain={[0, 30]}
              />
              <YAxis 
                type="number" 
                dataKey="puntuacion" 
                name="Puntuación" 
                unit=" pts"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
                domain={[0, 20]}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<ScoreCustomTooltip />} />
              <Scatter 
                data={data} 
                fill="rgb(var(--primary))"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Cada punto representa un examen. Eje X: tiempo usado, Eje Y: puntuación obtenida.
        </p>
      </div>

      {/* Duración vs Sin Responder */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Duración vs Preguntas Sin Responder
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="rgb(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="duracion" 
                name="Duración" 
                unit=" min"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
                domain={[0, 30]}
              />
              <YAxis 
                type="number" 
                dataKey="sinResponder" 
                name="Sin Responder"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
                domain={[0, 20]}
              />
              <ZAxis range={[100, 100]} />
              <Tooltip content={<UnansweredCustomTooltip />} />
              <Scatter 
                data={unansweredData} 
                fill="rgb(var(--warning))"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Relación entre tiempo usado y preguntas dejadas sin responder.
        </p>
      </div>
    </div>
  );
};

export default ScoreDurationScatter;
