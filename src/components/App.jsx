import React, { useEffect, useState } from "react";

const condition = {
  start: 0,
  pause: 1,
  count: 2,
};

function App() {
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [status, setStatus] = React.useState(condition.count);
  const intervalRef = React.useRef();
  let audioStart = new Audio("/workwork.mp3");
  let audioStop = new Audio("/jobsdone.mp3");

  function countDown() {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59);
        setMinutes((min) => min - 1);
      } else {
        let minutes = displayMessage ? 24 : 4;
        audioStop.play();
        let seconds = 59;

        setSeconds(seconds);
        setMinutes(minutes);
        setDisplayMessage((message) => !message);
      }
    } else {
      setSeconds((sec) => sec - 1);
    }
  }

  useEffect(() => {
    if (status === condition.start) {
      intervalRef.current = setInterval(() => {
        countDown();
      }, 1000);
    } else if (status === condition.pause && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds, status]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const start = () => {
    audioStart.play();
    setStatus(condition.start);
  };
  const pause = () => setStatus(condition.pause);
  const stop = () => {
    audioStop.play();
    setStatus(condition.pause);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <h1>🍅Pomodoro Timer🍅</h1>
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <h2>
        {timerMinutes}:{timerSeconds}
      </h2>
      <button className="buttons_new" onClick={start}>
        Start
      </button>
      <button className="buttons_new" onClick={pause}>
        Pause
      </button>
      <button className="buttons_new" onClick={stop}>
        Stop
      </button>
    </div>
  );
}

export default App;
