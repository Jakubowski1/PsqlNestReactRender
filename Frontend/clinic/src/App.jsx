
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import HomeDoctor from './components/HomeDoctor';
import HomeManager from './components/HomeManager';
//import HomePatient from './components/HomePatient';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RequireAuth allowedRoles={['manager']} />}>
        <Route path="/manager" element={<HomeManager />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}