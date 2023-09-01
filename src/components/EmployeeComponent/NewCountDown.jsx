
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min${minutes !== 1 ? 's' : ''} ${remainingSeconds} sec${remainingSeconds !== 1 ? 's' : ''}`;
  };

const NewCountDown = () => (
  <CountdownCircleTimer
    isPlaying
    duration={3600} 
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
     {({ remainingTime }) => formatTime(remainingTime)}
  </CountdownCircleTimer>
);

export default NewCountDown;
