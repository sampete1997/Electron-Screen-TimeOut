/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo, useState } from 'react';
import Draggable from 'react-draggable';
import '../App.css';

interface ActiveTimerProps {
  finalTimeFormat: string;
  getNewTimeOut: (newTime: number) => void;
  oldTime: number;
  second: number;
  handleReset: () => void;
}

function ScreenTimer(props: ActiveTimerProps) {
  const { finalTimeFormat, oldTime, getNewTimeOut, second, handleReset } =
    props;
  const [showOption, setShowOption] = useState(false);
  const [inputValue, setInputValue] = useState(oldTime / 60000);
  const [showSetting, setShowSetting] = useState('none');
  const [newTime, setNewTime] = useState(oldTime);
  const [position, setPostion] = useState({
    top: '0px',
    left: '0px',
  });
  console.log('sec', second);
  const handleRightClick = (e: any) => {
    e.preventDefault();

    setShowOption(true);
    setPostion({
      top: `${e.pageY}px`,
      left: `${e.pageX}px`,
    });
  };

  const handleOnClose = () => {
    setShowOption(false);
    setShowSetting('none');
  };

  const handleSetting = () => {
    setShowOption(true);
    setShowSetting('flex');
  };

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      if (!newTime.toString().match(/^0*?[1-9]\d*$/g)) {
        alert('Time should be positive integer only');
        setInputValue(oldTime / 60000);
        return;
      }
      getNewTimeOut(newTime);
      setInputValue(newTime);
      setShowSetting('none');
      setShowOption(false);
      alert(`Screen time out updated to ${newTime} min`);
    }
  };

  const handlePreReset = () => {
    handleReset();
    setInputValue(newTime);
    setShowOption(false);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setNewTime(value);
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="container">
      <p className="timeOutSession">
        Screen Timeout In {oldTime / 1000 - second} sec
      </p>
      <Draggable bounds="parent">
        <div className="box" onContextMenu={handleRightClick}>
          <p>Screen Time </p>
          <p>{finalTimeFormat || ''} </p>
        </div>
      </Draggable>
      {showOption ? (
        <div
          className="rightClickPrompt"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <div className="settingWrapper">
            <div>
              <div className="setting" onMouseDownCapture={handleSetting}>
                Set screen time out
              </div>
              <div className="setting" onMouseDown={handlePreReset}>
                reset Timer
              </div>
              <div className="setting">Theme</div>
            </div>
            <div onMouseDown={handleOnClose}>❎</div>
          </div>

          <div
            style={{
              top: position.top,
              left: position.left,
              display: showSetting,
            }}
          >
            <div className="subClickPrompt">
              <input
                className="setScreenTime"
                placeholder="Add time(min) & enter"
                onKeyDown={handleEnter}
                onChange={handleChange}
                defaultValue={inputValue}
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default memo(ScreenTimer);
