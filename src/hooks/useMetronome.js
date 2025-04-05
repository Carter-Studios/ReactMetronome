import { useRef, useCallback } from 'react';

/**
 * Custom hook for metronome functionality using Web Audio API
 */
const useMetronome = ({ bpm, beatsPerBar = 4, onBeat }) => {
  // Audio context and nodes references
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const timerIDRef = useRef(null);
  const beatCounterRef = useRef(0);
  const isRunningRef = useRef(false);
  
  // The lookahead time in milliseconds for scheduling notes
  const lookahead = 25.0; // ms
  // How far ahead to schedule audio (sec)
  const scheduleAheadTime = 0.1; // sec
  
  /**
   * Create and return an oscillator and gain node for click sound
   */
  const createClickSound = (time) => {
    if (!audioContextRef.current) return;
    
    // Create oscillator and gain nodes
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    // Set oscillator type to square wave for sharper click sound
    osc.type = 'square';
    
    // Set consistent oscillator properties for all beats
    osc.frequency.value = 900; // Middle pitch for all beats
    gain.gain.value = 2.5; // Increased volume for louder beeps
    
    // Set envelope for the click sound - extend duration for more audible click
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      time + 0.08
    );
    
    // Connect the audio nodes
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    // Schedule the oscillator with longer duration to match the envelope
    osc.start(time);
    osc.stop(time + 0.08);
  };
  
  /**
   * Calculate time for the next note and schedule it
   */
  const nextNote = useCallback(() => {
    // Calculate seconds per beat
    const secondsPerBeat = 60.0 / bpm;
    // Add beat length to last beat time
    nextNoteTimeRef.current += secondsPerBeat;
    // Advance beat counter
    beatCounterRef.current++;
  }, [bpm]);
  
  /**
   * Schedule notes ahead of the current time
   */
  const scheduleNotes = useCallback(() => {
    // Loop until we've scheduled ahead enough
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      // Calculate the beat position within the bar
      const beatPosition = beatCounterRef.current % beatsPerBar;
      
      // Call the onBeat callback with the current beat
      if (onBeat) {
        onBeat(beatPosition);
      }
      
      // Schedule click sound for the beat
      createClickSound(
        nextNoteTimeRef.current
      );
      
      // Calculate time for next note
      nextNote();
    }
    
    // Schedule the next check
    timerIDRef.current = window.setTimeout(scheduleNotes, lookahead);
  }, [beatsPerBar, onBeat, nextNote]);
  
  /**
   * Start the metronome
   */
  const startMetronome = useCallback(() => {
    // Return if already running
    if (isRunningRef.current) return;
    
    // Create new AudioContext if needed
    if (!audioContextRef.current) {
      // Use AudioContext with fallback for older browsers
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    
    // Resume AudioContext if it's suspended (needed for iOS)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    isRunningRef.current = true;
    beatCounterRef.current = 0;
    nextNoteTimeRef.current = audioContextRef.current.currentTime;
    
    // Start scheduling notes
    scheduleNotes();
  }, [scheduleNotes]);
  
  /**
   * Stop the metronome
   */
  const stopMetronome = useCallback(() => {
    if (!isRunningRef.current) return;
    
    // Clear the timer
    window.clearTimeout(timerIDRef.current);
    isRunningRef.current = false;
    
    // If onBeat callback exists, reset the beat display
    if (onBeat) {
      onBeat(-1);
    }
  }, [onBeat]);
  
  return {
    startMetronome,
    stopMetronome,
    isRunning: isRunningRef.current
  };
};

export default useMetronome;
