import './App.css';
import { useEffect, useState } from 'react';
import ScreenTimer from './components/ScreenTimer';

let screenTimer: any;

export default function App() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [second, setSecond] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);

  const handleUserActivity = () => {
    clearTimeout(screenTimer);
    setIsActive(true);
    document.body.style.backgroundColor = 'white';
    screenTimer = setTimeout(() => {
      setIsActive(false);
      document.body.style.backgroundColor = 'black';
    }, 10000);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleUserActivity);
    const screenStartTime = window.setInterval(() => {
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
  }, [second, isActive]);

  const isTimeFormat = (value: string) => {
    if (value.length < 2) {
      return '0'.concat(value);
    }
    return value;
  };
  const finalTimeFormat = () => {
    const sec = isTimeFormat(second.toString());
    const min = isTimeFormat(minute.toString());
    const hr = isTimeFormat(hour.toString());
    return `${hr}: ${min}: ${sec}`;
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="app"
      onMouseDown={handleUserActivity}
      onMouseMove={handleUserActivity}
    >
      {isActive ? (
        <ScreenTimer finalTimeFormat={finalTimeFormat()} />
      ) : (
        <div className="screenSaver">I Am Sleeping 😴</div>
      )}
    </div>
  );
}
