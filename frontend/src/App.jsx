import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignUp from './pages/Auth/SignUp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
