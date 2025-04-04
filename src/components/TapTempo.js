import React from 'react';
import useTapTempo from '../hooks/useTapTempo';
import './TapTempo.css';

/**
 * TapTempo component for setting BPM by tapping
 * @param {Object} props - Component props
 * @param {function} props.onTempoChange - Callback when tempo changes
 * @param {number} props.minBpm - Minimum BPM value
 * @param {number} props.maxBpm - Maximum BPM value
 */
const TapTempo = ({ onTempoChange, minBpm = 40, maxBpm = 250 }) => {
  const { tap, tapCount } = useTapTempo(onTempoChange, minBpm, maxBpm);
  
  return (
    <div className="tap-tempo-container">
      <button 
        className="tap-button" 
        onClick={tap}
        aria-label="Tap to set tempo"
      >
        TAP
      </button>
      <div className="tap-count">
        {tapCount > 0 && <span>Taps: {tapCount}</span>}
      </div>
      <div className="tap-info">
        Tap repeatedly to set tempo
      </div>
    </div>
  );
};

export default TapTempo;