import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleListings from "./components/VehicleListings"
import Admin from "./components/Admin"
import AddVehicle from './components/AddVehicle'
import UpdateVehicle from './components/UpdateVehicle'
import AdminLogin from './components/AdminLogin'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserProfile from './components/UserProfile';
import VehicleBooking from './components/VehicleBooking';
import AddAdmin from './components/AddAdmin';
import AdminProfile from './components/AdminProfile';
import { AdminAuthContext } from './components/AdminAuthContext';
import { AuthContext } from './components/AuthContext';
import BookingRequest from './components/BookingRequest';


export default function App() {

  const { ProtectedAdminRoute } = useContext(AdminAuthContext)
  const { ProtectedUserRoute } = useContext(AuthContext)
  return (
    <div className='demo'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VehicleListings/>} />
          <Route path='/UserSignIn' element={<UserSignIn/>}/>
          <Route path='/UserSignUp' element={<UserSignUp/>}/>
          <Route path='/UserProfile' element={<ProtectedUserRoute element={<UserProfile />} />} />
          <Route path='/VehicleBooking/:id' element={<ProtectedUserRoute element={<VehicleBooking />} />} />
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path='/Admin' element={<ProtectedAdminRoute element={<Admin />} />} />
          <Route path='/AdminProfile' element={<ProtectedAdminRoute element={<AdminProfile />} />} />
          <Route path='/AddAdmin' element={<ProtectedAdminRoute element={<AddAdmin />} />} />
          <Route path='/AddVehicle' element={<ProtectedAdminRoute element={<AddVehicle />} />} />
          <Route path="/UpdateVehicle/:id" element={<ProtectedAdminRoute element={<UpdateVehicle />} />} />
          <Route path="/BookingRequest" element={<ProtectedAdminRoute element={<BookingRequest />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}