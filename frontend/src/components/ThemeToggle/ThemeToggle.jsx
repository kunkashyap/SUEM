// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import './theme-toggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      <span className="toggle-thumb" />
      <span className="toggle-icon toggle-icon-sun">
        <Sun size={13} strokeWidth={2.5} />
      </span>
      <span className="toggle-icon toggle-icon-moon">
        <Moon size={13} strokeWidth={2.5} />
      </span>
    </button>
  );
}
