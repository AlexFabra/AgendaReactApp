import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import '../../styles.css'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useEffect, useState } from 'react'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { useDispatch, useSelector } from 'react-redux'

import { AddNewFab } from '../ui/AddNewFab'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messages-es'
import moment from 'moment'
import { uiOpenModal } from '../../actions/ui.js'

moment.locale('es');

//configuramos el moment:
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  //useState para mostrar la vista cuyo id se ha guardado en el localStorage, si hay:
  //debemos adjuntar la constante lastView en el calendario, en la propiedad view
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  //obtenemos la información del evento clicado (doble click)
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }
  //cuando se clique sobre un evento:
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }
  //cuando cambie la vista del calendario (mes/semana/dia/agenda)
  const onViewChange = (e) => {
    //actualizamos la variable de lastView con la nueva vista:
    setLastView(e)
    //grabamos la vista para recuperarla si salimos y volvemos a entrar.
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  }

  //lo que regrese esta constante es el estilo que le va a aplicar 
  //al evento.
  const eventStyleGetter = (event, start, end, isSelected) => {

    //el color del evento dependerá de si es el usuario quien lo creó o no:

    const style = {
      backgroundColor: (uid===event.user._id) ? '#367CF7' : '#467311',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return { style }
  }

  return (
    <>
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
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{ event: CalendarEvent }}
      />

      {/* para mostrar el componente solo si activeEvent es true: */}
      {(activeEvent) && <DeleteEventFab />}

      <AddNewFab />

      <CalendarModal />
    </>
  )
}
