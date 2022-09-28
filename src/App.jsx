import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/offers' element={< Offers />} />
      <Route path='/sign-in' element={< SignIn />} />
      <Route path='/sign-up' element={< SignUp />} />
      <Route path='/forgot-password' element={< ForgotPassword />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
