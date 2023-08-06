import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/custom-calendar.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const EventDetails = ({ event }) => (
  <div className="custom-event-wrapper">
    <div className="custom-event-wrapper">
      <p className="custom-event-title">
        <strong>{event.title}</strong>
      </p>
      <p className="custom-event-time">
        {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
      </p>
      <p className="custom-event-location">
        {event.location}
      </p>
    </div>
  </div>
);

const ClassCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);

  const navigate = useNavigate();

  return (
    <div className='calendar'>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']} 
        components={{
          event: EventDetails,
        }}
        onSelectEvent={event => navigate("/details/"+event)}
      />
    </div>
  );
};


export default ClassCalendar;