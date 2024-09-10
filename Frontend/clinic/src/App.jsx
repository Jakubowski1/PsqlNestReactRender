
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeDoctor from './components/HomeDoctor';
import HomeManager from './components/HomeManager';
//import HomePatient from './components/HomePatient';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
import HomePatient from './components/HomePatient';
import MyProfile from './components/UserProfile';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        

        <Route element={<RequireAuth allowedRoles={['manager']} />}>
        <Route path="/manager" element={<HomeManager />} />
        <Route path="/manager/:id" element={<MyProfile />} />

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

//NEXT step is to create a home page for patient or crud for manager
//I think the second one is more useful