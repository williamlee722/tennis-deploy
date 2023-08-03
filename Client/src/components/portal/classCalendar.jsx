import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Custom event component to render additional details on click
const EventDetails = ({ event }) => (
  <div className="custom-event-wrapper">
        <p className="custom-event-title">
          <strong>{event.title}</strong>
        </p>
        <p className="custom-event-time">
          {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
        </p>
        <p className="custom-event-location">{event.location}</p>
        {/* Add more event details here as needed */}
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
        style={{ height: 1000, width: '80vw'}} // Adjust the height according to your requirements
        views={['month']} // Show only the month view
        components={{
          event: EventDetails, // Use the custom event component for rendering events
        }}
      />
    </div>
  );
};

  
export default ClassCalendar;