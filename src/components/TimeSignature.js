import React from 'react';

const TimeSignature = ({ timeSignature, onTimeSignatureChange }) => {
  const commonTimeSignatures = [
    { beatsPerBar: 2, beatUnit: 4 },
    { beatsPerBar: 3, beatUnit: 4 },
    { beatsPerBar: 4, beatUnit: 4 },
    { beatsPerBar: 5, beatUnit: 4 },
    { beatsPerBar: 6, beatUnit: 8 },
    { beatsPerBar: 7, beatUnit: 8 },
    { beatsPerBar: 12, beatUnit: 8 }
  ];

  const isSelected = (ts) => {
    return ts.beatsPerBar === timeSignature.beatsPerBar && 
           ts.beatUnit === timeSignature.beatUnit;
  };

  return (
    <div className="time-signature-container">
      <div className="time-signature-label">Time Signature</div>
      <div className="time-signature-buttons">
        {commonTimeSignatures.map((ts, index) => (
          <button
            key={index}
            className={`time-sig-button ${isSelected(ts) ? 'selected' : ''}`}
            onClick={() => onTimeSignatureChange(ts)}
          >
            {ts.beatsPerBar}/{ts.beatUnit}
          </button>
        ))}
      </div>
      <style jsx>{`
        .time-signature-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        
        .time-signature-label {
          font-size: 16px;
          color: #666;
          margin-bottom: 5px;
        }
        
        .time-signature-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 300px;
        }
        
        .time-sig-button {
          padding: 8px 15px;
          border-radius: 20px;
          background-color: #e9e9e9;
          color: #333;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        
        .time-sig-button.selected {
          background-color: #007AFF;
          color: white;
          box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
        }
        
        .time-sig-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default TimeSignature;
