import './App.css';
import { Fragment } from 'react';
import HomePatient from './components/HomePatient';
import SignIn from './components/SignIn';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route path="*" element={<SignIn />} />

      <Route path="/" element={<HomePatient />} />

      <Route path="*" element={<SignIn />} />

    </Routes>
  );
}

export default App;
