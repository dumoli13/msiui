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
    return (React.createElement("div", { className: "flex items-center gap-4 text-neutral-80 font-medium text-20px" },
        React.createElement("div", { className: "bg-primary-surface text-primary-main rounded-md p-2" },
            React.createElement(Calendar, null)),
        React.createElement("div", { className: "min-w-[100px]" }, date),
        React.createElement("div", { className: "w-0 h-[30px] rounded-full border-x-2 border-neutral-20" }),
        React.createElement("div", { className: "bg-primary-surface text-primary-main rounded-md p-2" },
            React.createElement(Clock, null)),
        React.createElement("div", { className: "min-w-[100px]" }, time)));
};
export default HeaderClock;
//# sourceMappingURL=HeaderClock.js.map