import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="fixed right-4 top-16 sm:top-4 z-50 rounded-full p-2 md:p-3 shadow-lg border border-slate-200/70 bg-white/90 text-slate-700 backdrop-blur transition-colors hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900"
    >
      {isDark ? (
        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M8.05 15.95l-1.414 1.414m0-10.828L8.05 8.05m8.536 8.536-1.414 1.414M12 7a5 5 0 100 10 5 5 0 000-10z"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
