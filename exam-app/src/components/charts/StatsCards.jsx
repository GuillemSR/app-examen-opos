import React from 'react';

const StatsCards = ({ stats, formatDuration }) => {
  if (!stats) return null;

  const cards = [
    {
      title: 'Total Exámenes',
      value: stats.totalExams,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      textColor: 'text-primary'
    },
    {
      title: 'Media Puntuación',
      value: `${stats.avgPoints} pts`,
      subtitle: `${stats.avgPercentage}%`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      textColor: 'text-primary'
    },
    {
      title: 'Mejor Resultado',
      value: `${stats.bestExam?.percentage}%`,
      subtitle: `${stats.bestExam?.points} pts`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      textColor: 'text-success'
    },
    {
      title: 'Tiempo Medio',
      value: formatDuration(stats.avgDuration),
      subtitle: 'min:seg',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      textColor: 'text-muted-foreground'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card p-6"
        >
          <div className={`${card.textColor} mb-2`}>
            {card.icon}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {card.value}
          </div>
          {card.subtitle && (
            <div className="text-sm text-muted-foreground">
              {card.subtitle}
            </div>
          )}
          <div className="text-sm text-muted-foreground mt-1">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
