import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, duration = 800, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0;

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    let frame;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(numericValue * eased);
      setDisplay(start);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [numericValue, duration]);

  if (typeof value === 'string' && !/^\d+$/.test(value)) {
    return <span>{value}</span>;
  }

  return <span>{display.toLocaleString()}{suffix}</span>;
}
