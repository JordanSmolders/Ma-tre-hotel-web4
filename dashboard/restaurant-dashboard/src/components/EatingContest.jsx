import { useState } from 'react';

const EatingContest = ({ state, setState }) => {
  const [newParticipant, setNewParticipant] = useState('');
  
  const addParticipant = () => {
    if (!newParticipant) return;
    
    setState(prev => ({
      ...prev,
      contest: {
        ...prev.contest,
        participants: [
          ...prev.contest.participants,
          { name: newParticipant, steaks: 0 }
        ]
      }
    }));
    setNewParticipant('');
  };

  const incrementSteaks = (participantIndex) => {
    const updated = [...state.contest.participants];
    updated[participantIndex].steaks += 1;
    setState(prev => ({
      ...prev,
      contest: { ...prev.contest, participants: updated }
    }));
  };

  return (
    <div className="eating-contest">
      <h2 className="section-title">🥩 Steak Eating Contest</h2>
      <div className="contest-info">
        <p>Current Record: {state.contest.record} steaks!</p>
      </div>

      <div className="form-group">
        <input
          className="form-input"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Participant name"
        />
        <button className="button" onClick={addParticipant}>
          Add Participant
        </button>
      </div>

      <div className="participants-list">
        {state.contest.participants
          .sort((a, b) => b.steaks - a.steaks)
          .map((p, i) => (
            <div key={i} className="participant-item">
              <div className="participant-info">
                <span className="participant-name">{p.name}</span>
                <span className="steak-count">{p.steaks}</span>
              </div>
              <button 
                className="button small"
                onClick={() => incrementSteaks(i)}
              >
                Add Steak
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EatingContest;