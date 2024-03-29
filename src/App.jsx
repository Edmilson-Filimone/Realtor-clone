import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Category from './pages/Category'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'
import Listing from './pages/Listing'

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path='/profile' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/create-listing' element={<PrivateRoute />}>
        <Route path='/create-listing' element={< CreateListing /> } />
      </Route>
      <Route path='/edit-listing/:listingID' element={<PrivateRoute />}>
        <Route path='/edit-listing/:listingID' element={< EditListing /> } />
      </Route>
      <Route path='/category/:type' element={< Category />} />
      <Route path='/category/:type/:id' element={< Listing />} />
      <Route path='/offers' element={< Offers />} />
      <Route path='/sign-in' element={< SignIn />} />
      <Route path='/sign-up' element={< SignUp />} />
      <Route path='/forgot-password' element={< ForgotPassword />} />
    </Routes>
    </BrowserRouter>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
