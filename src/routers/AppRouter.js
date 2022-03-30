import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { startChecking } from "../actions/auth";
import { useDispatch } from "react-redux";

export const AppRouter = () => {

  //renovar token de usuario 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
