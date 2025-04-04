import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for tap tempo functionality
 * @param {function} onTempoChange - Callback when tempo is calculated
 * @param {number} minBpm - Minimum BPM value
 * @param {number} maxBpm - Maximum BPM value
 * @returns {Object} - Tap function and tap count
 */
const useTapTempo = (onTempoChange, minBpm = 40, maxBpm = 250) => {
  const [tapCount, setTapCount] = useState(0);
  const tapTimesRef = useRef([]);
  const TAP_HISTORY_SIZE = 4; // Number of taps to consider for average
  
  // Reset after 2 seconds of no taps
  const resetTimeoutRef = useRef(null);
  
  const calculateTempo = useCallback(() => {
    const tapTimes = tapTimesRef.current;
    if (tapTimes.length < 2) return;
    
    // Calculate intervals between taps
    const intervals = [];
    for (let i = 1; i < tapTimes.length; i++) {
      intervals.push(tapTimes[i] - tapTimes[i - 1]);
    }
    
    // Calculate average interval
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    
    // Convert to BPM (beats per minute)
    let calculatedBpm = Math.round(60000 / averageInterval);
    
    // Constrain to min/max values
    calculatedBpm = Math.max(minBpm, Math.min(maxBpm, calculatedBpm));
    
    // Call the callback with the new tempo
    onTempoChange(calculatedBpm);
  }, [onTempoChange, minBpm, maxBpm]);
  
  const tap = useCallback(() => {
    const now = Date.now();
    
    // Clear any existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    // Set a timeout to reset tap count if user stops tapping
    resetTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
      tapTimesRef.current = [];
    }, 2000);
    
    // Add current time to tap times array
    tapTimesRef.current.push(now);
    
    // Keep only the last TAP_HISTORY_SIZE taps
    if (tapTimesRef.current.length > TAP_HISTORY_SIZE) {
      tapTimesRef.current.shift();
    }
    
    // Update tap count
    setTapCount(prevCount => prevCount + 1);
    
    // Calculate tempo if we have enough taps
    if (tapTimesRef.current.length >= 2) {
      calculateTempo();
    }
  }, [calculateTempo]);
  
  return { tap, tapCount };
};

export default useTapTempo;