import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useState } from 'react'

import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messages-es'
import moment from 'moment'
import { uiOpenModal } from '../../actions/ui.js'
import { useDispatch } from 'react-redux'

moment.locale('es');

//configuramos el moment:
const localizer = momentLocalizer(moment);
const events = [{
  title: 'El dia d',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'es el momento',
  user: {
    _id: '134',
    name: 'Alejandro'
  }
}]

export const CalendarScreen = () => {

  const dispatch = useDispatch();

  //useState para mostrar la vista cuyo id se ha guardado en el localStorage, si hay:
  //debemos adjuntar la constante lastView en el calendario, en la propiedad view
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  //obtenemos la información del evento clicado (doble click)
  const onDoubleClick = (e) => {
    console.log(e);
    console.log('abrir modal');
    dispatch(uiOpenModal());
  }
  //cuando se clique sobre un evento:
  const onSelectEvent = (e) => {
    console.log(e);
  }
  //cuando cambie la vista del calendario (mes/semana/dia/agenda)
  const onViewChange = (e) => {
    //actualizamos la variable de lastView con la nueva vista:
    setLastView(e)
    //grabamos la vista para recuperarla si salimos y volvemos a entrar.
    localStorage.setItem('lastView', e);
  }

  //lo que regrese esta constante es el estilo que le va a aplicar 
  //al evento.
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
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
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />
      <CalendarModal />
    </div>
  )
}
