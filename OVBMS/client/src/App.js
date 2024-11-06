import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleListings from "./components/VehicleListings"
import Admin from "./components/Admin"
import AddVehicle from './components/AddVehicle'
import UpdateVehicle from './components/UpdateVehicle.js'
import AdminLogin from './components/AdminLogin'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserProfile from './components/UserProfile';
import VehicleBooking from './components/VehicleBooking';
import AddAdmin from './components/AddAdmin';
import AdminProfile from './components/AdminProfile';


export default function App() {
  return (
    <div className='demo'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VehicleListings/>} />
          <Route path='/UserSignIn' element={<UserSignIn/>}/>
          <Route path='/UserSignUp' element={<UserSignUp/>}/>
          <Route path='/UserProfile' element={<UserProfile/>}/>
          <Route path='/VehicleBooking' element={<VehicleBooking/>}/>
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/AdminProfile" element={<AdminProfile/>} />
          <Route path="/AddAdmin" element={<AddAdmin/>} />
          <Route path="/AddVehicle" element={<AddVehicle/>} />
          <Route path="/UpdateVehicle/:id" element={<UpdateVehicle/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}