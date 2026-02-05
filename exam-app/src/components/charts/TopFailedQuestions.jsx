import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Tooltip personalizado que muestra pregunta y respuestas
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const questionData = payload[0]?.payload;
    
    return (
      <div className="card p-4 border border-border max-w-md">
        {/* Header con contador de fallos */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger/10 text-danger border border-danger/20">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {questionData?.fallos} {questionData?.fallos === 1 ? 'fallo' : 'fallos'}
          </span>
        </div>
        
        {/* Pregunta */}
        <p className="text-sm text-foreground font-medium mb-3 leading-relaxed">
          {questionData?.fullText}
        </p>
        
        {/* Respuestas */}
        {questionData?.answers ? (
          <div className="space-y-1.5">
            {Object.entries(questionData.answers).map(([key, value]) => {
              const isCorrect = questionData.correctAnswer?.includes(key);
              return (
                <div
                  key={key}
                  className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                    isCorrect
                      ? 'bg-success/10 border border-success/20'
                      : 'bg-surface'
                  }`}
                >
                  <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${
                    isCorrect
                      ? 'bg-success text-white'
                      : 'bg-surface-hover text-muted-foreground'
                  }`}>
                    {key.toUpperCase()}
                  </span>
                  <span className={`flex-1 leading-relaxed ${
                    isCorrect
                      ? 'text-success font-medium'
                      : 'text-muted-foreground'
                  }`}>
                    {value}
                  </span>
                  {isCorrect && (
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            Respuestas no disponibles para examenes antiguos.
          </p>
        )}
      </div>
    );
  }
  return null;
};

const TopFailedQuestions = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-8">
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Sin preguntas falladas
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Completa algunos examenes para ver aqui las preguntas que mas te cuestan.
          </p>
        </div>
      </div>
    );
  }

  // Preparar datos para el grafico
  const chartData = data.map((q, index) => ({
    name: `#${index + 1}`,
    fullText: q.text,
    answers: q.answers,
    correctAnswer: q.correctAnswer,
    count: q.count,
    fallos: q.count
  }));

  // Colores para las barras (degradado de rojo/rose)
  const getBarColor = (index) => {
    const colors = [
      'rgb(var(--danger))',
      'rgb(225 29 72)', // rose-600
      'rgb(244 63 94)', // rose-500
      'rgb(251 113 133)', // rose-400
      'rgb(252 165 165)', // rose-300
      'rgb(254 202 202)', // rose-200
    ];
    return colors[Math.min(index, colors.length - 1)];
  };

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="relative bg-danger/10 border-b border-danger/20 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-danger/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Preguntas Mas Falladas
            </h3>
            <p className="text-muted-foreground text-sm">
              Top {data.length} preguntas donde mas errores cometes
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Grafico de barras */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} stroke="rgb(var(--border))" />
              <XAxis 
                type="number"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 11 }}
                allowDecimals={false}
              />
              <YAxis 
                type="category"
                dataKey="name"
                tick={{ fill: 'rgb(var(--chart-text))', fontSize: 11 }}
                width={35}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                wrapperStyle={{ zIndex: 100 }}
              />
              <Bar dataKey="fallos" name="Veces fallada" radius={[0, 6, 6, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tip informativo */}
        <div className="mt-4 flex items-center gap-3 p-3 bg-surface rounded-lg">
          <svg className="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Pasa el raton sobre las barras para ver la pregunta y las respuestas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopFailedQuestions;
