import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';

const Timer = () => {
  const { getContent, loading } = useContent();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (loading) return;

    const endDate = getContent('timer', 'end_date', '2025-12-31T23:59:59');
    const targetDate = new Date(endDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, getContent]);

  if (loading) {
    return <div className="text-center py-8 bg-gradient-to-r from-primary to-secondary text-white">Carregando...</div>;
  }

  return (
    <div className="text-center py-8 bg-gradient-to-r from-primary to-secondary">
      <p className="text-white font-helvetica text-sm mb-4 tracking-wide uppercase opacity-90">
        {getContent('timer', 'title', 'Oferta por tempo limitado!')}
      </p>
      <p className="text-white/80 font-helvetica text-xs mb-6">
        {getContent('timer', 'subtitle', 'Não perca esta oportunidade única')}
      </p>
      <div className="flex justify-center items-center gap-4 sm:gap-6">
        <div className="text-white text-center">
          <div className="text-3xl sm:text-5xl font-anton font-bold bg-white/10 rounded-lg px-3 py-2">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-helvetica uppercase tracking-wider mt-1">
            Dias
          </div>
        </div>
        <div className="text-white text-2xl sm:text-4xl font-anton">:</div>
        <div className="text-white text-center">
          <div className="text-3xl sm:text-5xl font-anton font-bold bg-white/10 rounded-lg px-3 py-2">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-helvetica uppercase tracking-wider mt-1">
            Horas
          </div>
        </div>
        <div className="text-white text-2xl sm:text-4xl font-anton">:</div>
        <div className="text-white text-center">
          <div className="text-3xl sm:text-5xl font-anton font-bold bg-white/10 rounded-lg px-3 py-2">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-helvetica uppercase tracking-wider mt-1">
            Minutos
          </div>
        </div>
        <div className="text-white text-2xl sm:text-4xl font-anton">:</div>
        <div className="text-white text-center">
          <div className="text-3xl sm:text-5xl font-anton font-bold bg-white/10 rounded-lg px-3 py-2">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-helvetica uppercase tracking-wider mt-1">
            Segundos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;