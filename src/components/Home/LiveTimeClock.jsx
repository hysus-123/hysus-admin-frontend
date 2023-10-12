import React, { useState, useEffect } from 'react';
// import './Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="clock">
      <div className="hand hour" style={{ transform: `rotate(${hourDegrees}deg)` }}></div>
      <div className="hand minute" style={{ transform: `rotate(${minuteDegrees}deg)` }}></div>
      <div className="hand second" style={{ transform: `rotate(${secondDegrees}deg)` }}></div>
      <div className="center"></div>
    </div>
  );
}

export default Clock;
