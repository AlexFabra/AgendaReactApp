import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { NavBar } from '../ui/NavBar'
import React from 'react'
import moment from 'moment'

//configuramos el moment:
const localizer = momentLocalizer(moment);
const events = [{
  title: 'El dia d',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa'
}]

export const CalendarScreen = () => {
  return (
    <div>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

    </div>
  )
}
