import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { startChecking } from "../actions/auth";

export const AppRouter = () => {

  //renovar token de usuario 
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])

  if (checking) {
    return <h1>Cargando...</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute> <LoginScreen /> </PublicRoute>} />
        <Route path="/" element={<PrivateRoute> <CalendarScreen /> </PrivateRoute>} />

        {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
