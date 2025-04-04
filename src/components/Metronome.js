import React, { useState, useRef } from 'react';
import './Metronome.css';
import BpmControl from './BpmControl';
import TimeSignature from './TimeSignature';
import useMetronome from '../hooks/useMetronome';

const Metronome = () => {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignature] = useState({ beatsPerBar: 4, beatUnit: 4 });
  
  const onBeatCallback = (beat) => {
    setCurrentBeat(beat % timeSignature.beatsPerBar);
  };
  
  const { startMetronome, stopMetronome } = useMetronome({
    bpm,
    beatsPerBar: timeSignature.beatsPerBar,
    onBeat: onBeatCallback
  });
  
  const togglePlay = () => {
    if (isPlaying) {
      stopMetronome();
      setIsPlaying(false);
      setCurrentBeat(0);
    } else {
      startMetronome();
      setIsPlaying(true);
    }
  };
  
  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };
  
  const handleTimeSignatureChange = (newTimeSignature) => {
    setTimeSignature(newTimeSignature);
    setCurrentBeat(0);
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };
  
  return (
    <div className="metronome">
      <div className="visualizer">
        {Array.from({ length: timeSignature.beatsPerBar }, (_, i) => (
          <div 
            key={i} 
            className={`beat ${currentBeat === i ? 'active' : ''} ${i === 0 ? 'first-beat' : ''}`}
          />
        ))}
      </div>
      
      <div className="tempo-display">
        <span className="bpm-value">{bpm}</span>
        <span className="bpm-label">BPM</span>
      </div>
      
      <BpmControl bpm={bpm} onBpmChange={handleBpmChange} />
      
      <TimeSignature 
        timeSignature={timeSignature} 
        onTimeSignatureChange={handleTimeSignatureChange} 
      />
      
      <button 
        className={`play-button ${isPlaying ? 'playing' : ''}`} 
        onClick={togglePlay}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default Metronome;
