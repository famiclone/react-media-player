// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from 'react';
import './MediaControl.css';

const MediaControl = ({ duration, currentTime, onChange, progress }: Props) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(10); // in percents
  const [clicked, setClicked] = useState(false); // in percents
  const element = useRef(null);

  function handleMouseMove(event, width, c) {
    const position = (event.clientX / width) * duration;

    setActive(true);

    setHover(position);

    if (onChange) {
      if (c) {
        console.log('clicked & move');
        onChange(position);
      } else {
        console.log('move');
      }
    }
  }

  function handleMouseLeave(event) {
    setActive(false);
  }

  function handleWidthTrack(duration, currentTime) {
    return (currentTime / duration) * 100;
  }

  function handleClick(event, width) {
    const position = (event.clientX / width) * duration;

    onChange(position);
    setClicked(true);
  }

  useEffect(() => {
    if (element.current?.offsetWidth) {
      const width = element.current.offsetWidth;

      element.current.addEventListener('mousemove', (e) =>
        handleMouseMove(e, width),
      );
      element.current.addEventListener('mouseleave', handleMouseLeave);
      element.current.addEventListener('click', (e) => handleClick(e, width));
      element.current.addEventListener('mouseup', () => {
        setClicked(false);
      });

      return () => {
        element.removeEventListener('mousemove');
      };
    }
  }, [element]);

  return (
    <div className="media-control">
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
          width: `${hover}%`,
        }}
      ></div>
      <div
        className={`current-time-track ${active ? 'active' : ''}`}
        style={{
          // width: `${currentTime}%`,
          width: `${handleWidthTrack(duration, currentTime)}%`,
        }}
      ></div>
      <div className="track" ref={element}></div>
    </div>
  );
};

export default MediaControl;
