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

const ProgressionCustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const examData = payload[0]?.payload;
    return (
      <div className="card p-3 border border-border">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mb-2">{examData?.fecha}</p>
        <p className="text-success">Correctas: {examData?.correctas}</p>
        <p className="text-danger">Incorrectas: {examData?.incorrectas}</p>
        <p className="text-muted-foreground">Sin responder: {examData?.sinResponder}</p>
        <p className="text-primary font-semibold mt-1">Porcentaje: {examData?.porcentaje}%</p>
      </div>
    );
  }
  return null;
};

const ProgressionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Progresión de Resultados
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
        Progresión de Resultados
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="rgb(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
              domain={[0, 20]}
            />
            <Tooltip content={<ProgressionCustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="correctas"
              name="Correctas"
              stroke="rgb(var(--success))"
              strokeWidth={2}
              dot={{ fill: 'rgb(var(--success))', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="incorrectas"
              name="Incorrectas"
              stroke="rgb(var(--danger))"
              strokeWidth={2}
              dot={{ fill: 'rgb(var(--danger))', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="sinResponder"
              name="Sin Responder"
              stroke="rgb(var(--chart-muted))"
              strokeWidth={2}
              dot={{ fill: 'rgb(var(--chart-muted))', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressionChart;
