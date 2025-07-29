import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({ minutes: 14, seconds: 21 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-8 bg-gradient-to-r from-primary to-secondary">
      <p className="text-white font-helvetica text-sm mb-4 tracking-wide uppercase opacity-90">
        O LOTE ATUAL VAI EXPIRAR EM…
      </p>
      <div className="flex justify-center items-center gap-6">
        <div className="text-white">
          <div className="text-6xl font-anton font-bold">
            {time.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm font-helvetica uppercase tracking-wider mt-1">
            Minutos
          </div>
        </div>
        <div className="text-white text-4xl font-anton">:</div>
        <div className="text-white">
          <div className="text-6xl font-anton font-bold">
            {time.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm font-helvetica uppercase tracking-wider mt-1">
            Segundos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;