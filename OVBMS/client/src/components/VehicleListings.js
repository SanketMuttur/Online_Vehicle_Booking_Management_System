import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthContext'

function VehicleListings() {

  const { CurrentUser } = useContext(AuthContext)

  const [VehicleInfo, setVehicleInfo] = useState([])

  useEffect(()=>{
    const fetchCarinfo = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/VehicleListings")
        setVehicleInfo(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCarinfo()
  },[])

  return (
    <div>
      <Navbar />
      <div className='d-flex bg-secondary justify-content-center align-items-center vh-100 mt-5'>
        <div className="container text-center bg-light p-4 rounded-5 shadow">
          <h1 className="my-4">Vehicle Listing</h1>
          <div className='table-responsive'>
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Vehicle_Image</th>
                  <th>Vehicle_Name</th>
                  <th>Price_Per_Day</th>
                  <th>Fuel_Type</th>
                  <th>Model_Year</th>
                  <th>Seating_Capacity</th>
                  <th>Book_The_Car</th>
                </tr>
              </thead>
              <tbody>
                {VehicleInfo.map((car) => (
                  <tr key={car.license_no} className="align-middle">
                    <td><img src={car.vehicle_image} className="img-fluid rounded" alt={car.vehicle_name} style={{ maxWidth: '200px', height: 'auto'}}></img></td>
                    <td>{car.vehicle_name}</td>
                    <td>{car.price_per_day}</td>
                    <td>{car.fuel_type}</td>
                    <td>{car.model_year}</td>
                    <td>{car.seating_capacity}</td>
                    {CurrentUser? <td><Link to="/VehicleBooking" className="btn btn-primary rounded">Book</Link></td> : <td><Link to="/UserSignIn" className="btn btn-primary rounded">Book</Link></td>}</tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
   </div>
);
}

export default VehicleListings