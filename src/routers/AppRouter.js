import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import React from 'react';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate replace to="/"/>} />
      </Routes>
    </BrowserRouter>
  )
}
