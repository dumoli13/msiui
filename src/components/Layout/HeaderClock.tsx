import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, Clock } from 'react-feather';

const HeaderClock = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = dayjs();
      const formattedDate = now.format('D/M/YYYY');
      const formattedTime = now.format('hh:mm A');

      setDate(formattedDate);
      setTime(formattedTime);
    };

    // Initial update
    updateDateTime();

    // Update every minute
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center gap-4 text-neutral-80 font-medium text-20px">
      <div className="bg-primary-surface text-primary-main rounded-md p-2">
        <Calendar />
      </div>
      <div className="min-w-[100px]">{date}</div>
      <div className="w-0 h-[30px] rounded-full border-x-2 border-neutral-20" />
      <div className="bg-primary-surface text-primary-main rounded-md p-2">
        <Clock />
      </div>
      <div className="min-w-[100px]">{time}</div>
    </div>
  );
};

export default HeaderClock;
