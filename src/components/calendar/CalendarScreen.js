import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { NavBar } from '../ui/NavBar'
import React from 'react'
import { messages } from '../../helpers/calendar-messages-es'
import moment from 'moment'

moment.locale('es');

//configuramos el moment:
const localizer = momentLocalizer(moment);
const events = [{
  title: 'El dia d',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes:'es el momento'
}]

export const CalendarScreen = () => {

//lo que regrese esta constante es el estilo que le va a aplicar 
//al evento.
const eventStyleGetter = (event,start,end,isSelected)=> {
  const style = {
    backgroundColor:'#367CF7',
    borderRadius:'0px',
    opacity:0.8,
    display:'block',
    color:'white'
  }
  return { style }
}

  return (
    <div>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />

    </div>
  )
}
