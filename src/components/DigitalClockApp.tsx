
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type ClockFormat = '12h' | '24h';
type ClockTheme = 'default' | 'dark' | 'light' | 'colorful';

const DigitalClockApp: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState<ClockFormat>('12h');
  const [theme, setTheme] = useState<ClockTheme>('default');
  const [showSeconds, setShowSeconds] = useState(true);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    let period = '';
    
    if (format === '12h') {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }
    
    const hoursStr = hours.toString().padStart(2, '0');
    return `${hoursStr}:${minutes}${showSeconds ? `:${seconds}` : ''}${period}`;
  };
  
  const getThemeClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'light':
        return 'bg-gray-100 text-gray-800';
      case 'colorful':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };
  
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="w-full border border-border rounded-lg shadow-sm bg-card p-4 flex flex-col items-center">
      <div className={`w-full rounded-lg p-6 ${getThemeClass()} flex flex-col items-center justify-center text-center mb-4`}>
        <div className="text-5xl font-mono font-bold tracking-wider">
          {formatTime()}
        </div>
        <div className="mt-2 text-sm opacity-80">
          {formattedDate}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFormat(format === '12h' ? '24h' : '12h')}
        >
          {format === '12h' ? '12-hour' : '24-hour'}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowSeconds(!showSeconds)}
        >
          {showSeconds ? 'Hide seconds' : 'Show seconds'}
        </Button>
        
        <div className="col-span-2 mt-2">
          <p className="text-xs text-muted-foreground mb-1">Theme:</p>
          <div className="grid grid-cols-4 gap-2">
            {(['default', 'dark', 'light', 'colorful'] as ClockTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`h-8 rounded-md border ${
                  theme === t ? 'ring-2 ring-ring ring-offset-1' : ''
                } ${t === 'default' ? 'bg-secondary' : 
                    t === 'dark' ? 'bg-gray-800' : 
                    t === 'light' ? 'bg-gray-100' : 
                    'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                aria-label={`${t} theme`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClockApp;
