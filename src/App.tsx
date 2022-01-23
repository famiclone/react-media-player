import { useEffect, useRef, useState } from 'react';
import './App.css';
import MediaControl from './components/MediaControl/MediaControl';

function App() {
  const [state, setState] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoEl = useRef(document.createElement('video'));

  useEffect(() => {
    if (videoEl.current) {
      videoEl.current.addEventListener('loadedmetadata', (e: any) => {
        console.log(e.target.duration);
        setDuration(e.target.duration);
      });
      videoEl.current.addEventListener('timeupdate', (e) => {
        // @ts-ignore
        console.log(e.target.currentTime);
        // @ts-ignore
        setState(e.target.currentTime);
      });
    }
  }, [videoEl]);

  return (
    <div className="App" style={{ paddingTop: '5rem' }}>
      <video
        controls
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        ref={videoEl}
      ></video>

      {duration && (
        <MediaControl
          duration={duration}
          currentTime={state}
          onChange={(e: any) => {
            console.log(e);
            videoEl.current.currentTime = e;
            setState(e);
          }}
        />
      )}
    </div>
  );
}

export default App;
