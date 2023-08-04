import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/custom-calendar.css';
import moment from 'moment';

// Custom event component to render additional details on click
const EventDetails = ({ event }) => (
  <div className="custom-event-wrapper">
    <div className="custom-event-wrapper">
      <p className="custom-event-title" style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
        <strong>{event.title}</strong>
      </p>
      <p className="custom-event-time" style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
        {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
      </p>
      <p className="custom-event-location" style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
        {event.location}
      </p>
    </div>
  </div>
);

const ClassCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <h2>Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000, width: '80vw' }} // Adjust the height according to your requirements
        views={['month']} // Show only the month view
        components={{
          event: EventDetails, // Use the custom event component for rendering events
        }}
      />
    </div>
  );
};


export default ClassCalendar;