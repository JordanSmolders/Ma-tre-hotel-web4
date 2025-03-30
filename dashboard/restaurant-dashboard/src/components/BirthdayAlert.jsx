import { useEffect, useState } from 'react';

const BirthdayAlert = ({ reservations }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const hasBirthday = reservations.some(reservation => 
      reservation.birthday && isToday(new Date(reservation.datetime))
    );
    setShowAlert(hasBirthday);
  }, [reservations]);

  return showAlert ? (
    <div className="alert alert-success">
      <div className="alert-content">
        <span className="alert-emoji">🎉</span>
        <div>
          <h3 className="alert-title">Birthday Celebration Today!</h3>
          <p className="alert-message">Prepare a complimentary dessert!</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default BirthdayAlert;