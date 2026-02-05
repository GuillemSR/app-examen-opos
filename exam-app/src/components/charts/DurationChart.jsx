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

const DurationCustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const examData = payload[0]?.payload;
    const mins = Math.floor(examData?.duracionSegundos / 60);
    const secs = examData?.duracionSegundos % 60;
    return (
      <div className="card p-3 border border-border">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mb-2">{examData?.fecha}</p>
        <p className="text-primary font-semibold">
          Duración: {mins}:{secs.toString().padStart(2, '0')}
        </p>
      </div>
    );
  }
  return null;
};

const DurationChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Duración por Examen
        </h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          No hay datos suficientes
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        Duración por Examen (minutos)
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="rgb(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
              domain={[0, 30]}
              label={{ value: 'min', angle: -90, position: 'insideLeft', fill: 'rgb(var(--chart-text))' }}
            />
            <Tooltip content={<DurationCustomTooltip />} />
            <Area
              type="monotone"
              dataKey="duracion"
              name="Duración"
              stroke="rgb(var(--primary))"
              strokeWidth={2}
              fill="url(#colorDuration)"
              dot={{ fill: 'rgb(var(--primary))', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DurationChart;
