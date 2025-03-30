import { useState, useEffect } from 'react';

const EatingContest = ({ state, setState }) => {
  const [newParticipant, setNewParticipant] = useState('');
  const [contestTime, setContestTime] = useState(0);
  const [isContestRunning, setIsContestRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isContestRunning) {
      interval = setInterval(() => {
        setContestTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isContestRunning]);

  // Check for winner
  useEffect(() => {
    if (state.contest.participants.some(p => p.steaks >= state.contest.record)) {
      const newWinner = [...state.contest.participants]
        .sort((a, b) => b.steaks - a.steaks)[0];
      setWinner(newWinner);
      setIsContestRunning(false);
    }
  }, [state.contest.participants]);

  const addParticipant = () => {
    if (!newParticipant || isContestRunning) return;
    
    setState(prev => ({
      ...prev,
      contest: {
        ...prev.contest,
        participants: [
          ...prev.contest.participants,
          { 
            name: newParticipant, 
            steaks: 0,
            lastSteakTime: 0
          }
        ]
      }
    }));
    setNewParticipant('');
  };

  const startContest = () => {
    if (state.contest.participants.length === 0) return;
    setIsContestRunning(true);
    setContestTime(0);
    setWinner(null);
  };

  const incrementSteaks = (participantIndex) => {
    if (!isContestRunning) return;
    
    const updated = [...state.contest.participants];
    updated[participantIndex].steaks += 1;
    updated[participantIndex].lastSteakTime = contestTime;
    
    setState(prev => ({
      ...prev,
      contest: { 
        ...prev.contest, 
        participants: updated,
        record: Math.max(prev.contest.record, updated[participantIndex].steaks)
      }
    }));
  };

  const resetContest = () => {
    setIsContestRunning(false);
    setContestTime(0);
    setWinner(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="eating-contest-container">
      <h2>🥩 Steak Eating Contest 🥩</h2>
      
      <div className="contest-info">
        <div className="contest-record">
          <h3>Current Record: {state.contest.record} steaks!</h3>
        </div>
        
        <div className="contest-timer">
          <span>Contest Duration: {formatTime(contestTime)}</span>
          <div className="contest-controls">
            <button 
              className={`button ${isContestRunning ? 'disabled' : 'start-button'}`}
              onClick={startContest}
              disabled={isContestRunning || state.contest.participants.length === 0}
            >
              {isContestRunning ? 'Contest In Progress' : 'Start Contest'}
            </button>
            <button 
              className="button reset-button"
              onClick={resetContest}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {winner && (
        <div className="winner-banner">
          <h3>🏆 Winner: {winner.name} with {winner.steaks} steaks! 🏆</h3>
        </div>
      )}

      <div className="participant-form">
        <input
          className="form-input"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Participant name"
          disabled={isContestRunning}
        />
        <button 
          className={`button ${isContestRunning ? 'disabled' : ''}`}
          onClick={addParticipant}
          disabled={isContestRunning}
        >
          Add Participant
        </button>
      </div>

      <div className="participants-list">
        {state.contest.participants
          .sort((a, b) => b.steaks - a.steaks)
          .map((p, i) => (
            <div key={i} className="participant-card">
              <div className="participant-info">
                <span className="participant-name">{p.name}</span>
                <span className="steak-count">{p.steaks} steaks</span>
                {p.lastSteakTime > 0 && (
                  <span className="last-steak-time">
                    Last at: {formatTime(p.lastSteakTime)}
                  </span>
                )}
              </div>
              <button 
                className={`steak-button ${!isContestRunning ? 'disabled' : ''}`}
                onClick={() => incrementSteaks(i)}
                disabled={!isContestRunning}
              >
                + Add Steak
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EatingContest;