import './App.scss'
import { RegistrationForm } from './components/RegistrationForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/login/Login'
import { Main } from './components/Main/Main'
import { useAuth } from './hooks/auth-hook'

function App() {
  const { token } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
