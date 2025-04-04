import React from 'react';
import './SoundOptions.css';

/**
 * SoundOptions component for selecting metronome sound settings
 * @param {Object} props - Component props
 * @param {Array} props.availableSounds - List of available sound options
 * @param {Object} props.currentSound - Currently selected sound
 * @param {number} props.volume - Current volume level (0.0 to 1.0)
 * @param {function} props.onSoundChange - Callback when sound type changes
 * @param {function} props.onVolumeChange - Callback when volume changes
 */
const SoundOptions = ({ 
  availableSounds, 
  currentSound, 
  volume,
  onSoundChange,
  onVolumeChange
}) => {
  const handleSoundChange = (e) => {
    onSoundChange(e.target.value);
  };
  
  const handleVolumeChange = (e) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <div className="sound-options">
      <h3>Sound Settings</h3>
      
      <div className="sound-selector">
        <label>Sound Type</label>
        <select 
          value={currentSound.id}
          onChange={handleSoundChange}
          className="sound-select"
        >
          {availableSounds.map(sound => (
            <option key={sound.id} value={sound.id}>
              {sound.name}
            </option>
          ))}
        </select>
        <p className="sound-description">{currentSound.description}</p>
      </div>
      
      <div className="volume-control">
        <label>Volume: {Math.round(volume * 100)}%</label>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default SoundOptions;