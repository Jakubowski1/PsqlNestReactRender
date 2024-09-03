import './App.css';
import HomeDoctor from './components/HomeDoctor';
import HomeManager from './components/HomeManager';
import HomePatient from './components/HomePatient';
import SignIn from './components/SignIn';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      
      <Route path="*" element={<SignIn />} />

      <Route path="/home" element={<HomePatient />} />
      <Route path="/doctor" element={<HomeDoctor />} />
      <Route path="/manager" element={<HomeManager />} />


      <Route path="*" element={<SignIn />} />

    </Routes>
  );
}

export default App;
