import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ state, setState }) => {
  const events = state.reservations.map(reservation => ({
    title: `Table ${reservation.tableId} - ${reservation.name}`,
    start: new Date(reservation.datetime),
    end: new Date(new Date(reservation.datetime).setHours(new Date(reservation.datetime).getHours() + 2)),
    allDay: false
  }));

  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
export default CalendarView;