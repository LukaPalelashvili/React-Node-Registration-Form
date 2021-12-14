import './App.css';
import { RegistrationForm } from './components/RegistrationForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import '../src/css/RegistrationForm.css';
import { Login } from '../src/components/login/Login';

function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<RegistrationForm />} />
      <Route path="/login" element={<Login/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
