// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import './MediaControl.css';

const MediaControl = ({ duration, currentTime, onChange, progress }: Props) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(10);
  const element = useRef(null);
  const clicked = useRef(false);

  function changeHoverPosition(event, leave) {
    setActive(true);

    let position =
      (event.nativeEvent.offsetX / element.current.offsetWidth) * duration;

    if (leave) {
      position = 0;
    }

    setHover(position);
  }

  function changeCurrentTime(event) {
    const position = (event.offsetX / element.current.offsetWidth) * duration;
    if (clicked.current) {
      onChange(position);
    }
  }

  function setClicked(bool, event) {
    event.preventDefault();

    changeCurrentTime(event);

    clicked.current = bool;
  }

  const formatSeconds = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  function handleWidthTrack(duration, currentTime) {
    return (currentTime / duration) * 100;
  }

  useEffect(() => {
    const el = element.current;

    el.addEventListener('mousemove', changeCurrentTime);

    el.addEventListener('mouseup', (event) => {
      setClicked(false, event);
    });

    el.addEventListener('mouseleave', (event) => {
      setActive(false);
    });

    return () => {
      el.addEventListener('mousemove', changeCurrentTime);
    };
  });

  return (
    <div
      className="mc media-control"
      ref={element}
      onMouseDown={(event) => setClicked(true, event)}
      onMouseLeave={(event) => changeHoverPosition(event, true)}
      onMouseMove={(event) => changeHoverPosition(event)}
    >
      {progress && (
        <div
          className="progress-track"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      )}
      <div
        className={`hover-track ${active ? 'active' : ''}`}
        style={{
          width: `${handleWidthTrack(duration, hover)}%`,
        }}
      >
        <div className="mc-hover-time">{formatSeconds(hover)}</div>
      </div>
      <div
        className={`current-time-track ${active ? 'active' : ''}`}
        style={{
          // width: `${currentTime}%`,
          width: `${handleWidthTrack(duration, currentTime)}%`,
        }}
      ></div>
      <div className="track"></div>
    </div>
  );
};

export default MediaControl;
