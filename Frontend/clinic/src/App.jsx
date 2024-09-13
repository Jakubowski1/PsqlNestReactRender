
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeDoctor from './pages/HomeDoctor';
import HomeManager from './pages/HomeManager';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RequireAuth from './services/requireAuth';
import NotFound from './pages/NotFound';
import HomePatient from './pages/HomePatient';
import UserProfilePage from './pages/UserProfilePage';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        

        <Route element={<RequireAuth allowedRoles={['manager']} />}>
        <Route path="/manager" element={<HomeManager />} />
        <Route path="/manager/:id" element={<UserProfilePage />} />

        </Route>
        <Route element={<RequireAuth allowedRoles={['doctor']} />}>
        <Route path="/doctor" element={<HomeDoctor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['patient']} />}>
        <Route path="/patient" element={<HomePatient />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

