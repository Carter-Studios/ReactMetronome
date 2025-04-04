import { useState, useCallback } from 'react';

/**
 * Custom hook for sound options
 * @returns {Object} - Sound options and controls
 */
const useSoundOptions = () => {
  // Available sound types
  const availableSounds = [
    { id: 'square', name: 'Click', description: 'Digital metronome click' },
    { id: 'sine', name: 'Soft', description: 'Gentle sine wave' },
    { id: 'triangle', name: 'Triangle', description: 'Smooth triangle sound' },
    { id: 'sawtooth', name: 'Sawtooth', description: 'Sharp sawtooth sound' }
  ];
  
  // Sound parameters
  const [currentSound, setCurrentSound] = useState(availableSounds[0]);
  const [volume, setVolume] = useState(1.0);
  const [tone, setTone] = useState({ 
    accentFreq: 1000, 
    regularFreq: 800 
  });
  
  // Change sound type
  const changeSound = useCallback((soundId) => {
    const sound = availableSounds.find(s => s.id === soundId);
    if (sound) {
      setCurrentSound(sound);
    }
  }, [availableSounds]);
  
  // Adjust volume
  const adjustVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);
  
  // Adjust tone frequencies
  const adjustTone = useCallback((accentFreq, regularFreq) => {
    setTone({
      accentFreq: accentFreq || tone.accentFreq,
      regularFreq: regularFreq || tone.regularFreq
    });
  }, [tone]);
  
  return {
    availableSounds,
    currentSound,
    volume,
    tone,
    changeSound,
    adjustVolume,
    adjustTone
  };
};

export default useSoundOptions;