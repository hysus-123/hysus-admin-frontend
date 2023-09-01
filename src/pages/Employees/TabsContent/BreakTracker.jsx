import { Button } from '@mui/material';
import React, {useState} from 'react';
import NewCountDown from '../../../components/EmployeeComponent/NewCountDown';

const BreakTracker = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };
  return (
    <div style={{textAlign:'center'}}>
      <Button
        variant='contained'
        sx={{ textAlign: 'center' }}
        onClick={() => {
          if (isTimerRunning) {
            pauseTimer();
          } else {
            startTimer();
          }
        }}
      >
        {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
      </Button>
      {isTimerRunning && <NewCountDown />}
    </div>
  )
}
export default BreakTracker;
