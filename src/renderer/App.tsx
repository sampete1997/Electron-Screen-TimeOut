/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useEffect, useState } from 'react';
import ScreenTimer from './components/ScreenTimer';

let screenTimer: any;

export default function App() {
  const timeOut: number =
    Number(window.localStorage.getItem('timeOut')) || 60000; // default 60 sec
  const [isActive, setIsActive] = useState<boolean>(true);
  const [second, setSecond] = useState<number>(1);
  const [minute, setMinute] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [newTimeOut, setNewTimeOut] = useState(timeOut);
  const [restartCount, setRestartCount] = useState<number>(0);

  console.log('timeOut', timeOut);

  useEffect(() => {
    clearTimeout(screenTimer);
    setRestartCount(0);
    screenTimer = setTimeout(() => {
      setIsActive(false);
      document.body.style.backgroundColor = 'black';
    }, newTimeOut);
  }, [newTimeOut]);

  const handleUserActivity = () => {
    clearTimeout(screenTimer);
    setIsActive(true);
    document.body.style.backgroundColor = 'white';
    setRestartCount(0);
    screenTimer = setTimeout(() => {
      setIsActive(false);
      document.body.style.backgroundColor = 'black';
    }, newTimeOut);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleUserActivity);
    const screenStartTime = window.setInterval(() => {
      setRestartCount(restartCount + 1);
      if (isActive) {
        if (second >= 59) {
          setSecond(0);
          if (minute >= 59) {
            setMinute(0);
            setHour(hour + 1);
          } else {
            setMinute(minute + 1);
          }
        } else {
          setSecond(second + 1);
        }
      }
    }, 1000);
    return () => {
      document.removeEventListener('keydown', handleUserActivity);
      clearInterval(screenStartTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [second, isActive, restartCount]);

  const convertValidTimeFormat = (value: string) => {
    if (value.length < 2) {
      return '0'.concat(value);
    }
    return value;
  };

  const handleReset: any = () => {
    window.localStorage.setItem('timeOut', '60000');
  };

  const finalTimeFormat = () => {
    const sec = convertValidTimeFormat(second.toString());
    const min = convertValidTimeFormat(minute.toString());
    const hr = convertValidTimeFormat(hour.toString());
    return `${hr}: ${min}: ${sec}`;
  };

  const getNewTimeOut = (value: number) => {
    const time = 10000 * 6 * value;
    window.localStorage.setItem('timeOut', time.toString());
    setNewTimeOut(time);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="app"
      onMouseDown={handleUserActivity}
      onMouseMove={handleUserActivity}
    >
      {isActive ? (
        <ScreenTimer
          oldTime={timeOut}
          getNewTimeOut={getNewTimeOut}
          finalTimeFormat={finalTimeFormat()}
          second={restartCount}
          handleReset={handleReset}
        />
      ) : (
        <div className="screenSaver">I Am Sleeping 😴</div>
      )}
    </div>
  );
}
