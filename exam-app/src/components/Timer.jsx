import React from 'react';

const Timer = ({ formatTime, timeRemaining }) => {
  // Cambiar color según el tiempo restante
  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-red-600'; // 5 minutos o menos
    if (timeRemaining <= 600) return 'text-orange-600'; // 10 minutos o menos
    return 'text-green-600';
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-lg shadow-md px-4 py-2 md:px-6 md:py-3">
      <svg 
        className={`w-5 h-5 md:w-6 md:h-6 ${getTimeColor()}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className={`text-xl md:text-2xl font-bold ${getTimeColor()}`}>
        {formatTime()}
      </span>
    </div>
  );
};

export default Timer;
