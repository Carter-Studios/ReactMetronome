import React from 'react';

const BpmControl = ({ bpm, onBpmChange }) => {
  const handleSliderChange = (e) => {
    onBpmChange(parseInt(e.target.value, 10));
  };
  
  const handleButtonClick = (increment) => {
    const newBpm = Math.min(Math.max(bpm + increment, 30), 240);
    onBpmChange(newBpm);
  };
  
  return (
    <div className="bpm-control">
      <div className="slider-container">
        <input
          type="range"
          min="30"
          max="240"
          value={bpm}
          onChange={handleSliderChange}
          className="bpm-slider"
        />
      </div>
      <div className="bpm-buttons">
        <button 
          className="bpm-button minus"
          onClick={() => handleButtonClick(-1)}
          aria-label="Decrease BPM"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          className="bpm-button plus"
          onClick={() => handleButtonClick(1)}
          aria-label="Increase BPM"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <style jsx>{`
        .bpm-control {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .slider-container {
          width: 100%;
          padding: 0 10px;
        }
        
        .bpm-slider {
          width: 100%;
        }
        
        .bpm-buttons {
          display: flex;
          justify-content: center;
          gap: 40px;
        }
        
        .bpm-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #007AFF;
          color: white;
          font-size: 24px;
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
          transition: all 0.2s ease;
        }
        
        .bpm-button:active {
          transform: scale(0.95);
          box-shadow: 0 1px 4px rgba(0, 122, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default BpmControl;
