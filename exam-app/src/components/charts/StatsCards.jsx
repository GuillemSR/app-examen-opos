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
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600'
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
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-600'
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
      bgColor: 'bg-green-500',
      textColor: 'text-green-600'
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
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-20 h-20 ${card.bgColor} opacity-10 rounded-bl-full`} />
          <div className={`${card.textColor} dark:text-slate-300 mb-2`}>
            {card.icon}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </div>
          {card.subtitle && (
            <div className="text-sm text-gray-500 dark:text-slate-400">
              {card.subtitle}
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
