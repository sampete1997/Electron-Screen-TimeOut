import { memo } from 'react';
import Draggable from 'react-draggable';
import '../App.css';

interface ActiveTimerProps {
  finalTimeFormat: string;
}

function ScreenTimer(props: ActiveTimerProps) {
  const { finalTimeFormat } = props;
  return (
    <div className="container">
      <Draggable bounds="parent">
        <div className="box">
          <p>Screen Time</p>
          <p>{finalTimeFormat || ''} </p>
        </div>
      </Draggable>
    </div>
  );
}

export default memo(ScreenTimer);
