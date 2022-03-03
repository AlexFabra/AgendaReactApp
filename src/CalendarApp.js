import {AppRouter} from './routers/AppRouter'
import { Provider } from 'react-redux'
import React from 'react'
import {store} from './store/store'

export const CalendarApp = () => {
  return (
    <Provider store= {store}>
      <AppRouter/>
    </Provider>
  )
}
