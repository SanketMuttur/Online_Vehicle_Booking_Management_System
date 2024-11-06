import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'

function Admin() {

  const [VehicleInfo, setVehicleInfo] = useState([])

  useEffect(()=>{
    const fetchCarinfo = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/Admin")
        setVehicleInfo(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCarinfo()
  },[])

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/Admin/"+id)
      window.location.reload()
      alert(`Vehicle with License plate ${id} deleted successfully!`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <AdminNavbar />
      <div className='d-flex bg-secondary justify-content-center align-items-center vh-100 mt-5'>
        <div className="container text-center bg-light p-4 rounded-5 shadow">
        <h1 className="my-4">Manage Vehicles</h1>
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
                <th>Update_Car_Info</th>
                <th>Delete_Car</th>
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
                  <td><Link to={`/UpdateVehicle/${car.license_no}`} className="btn btn-primary rounded">Update Vehicle Info</Link></td>
                  <td><button className="btn btn-danger rounded" onClick={()=>handleDelete(car.license_no)}>Delete Vehicle Info</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <Link to ="/AddVehicle" className="btn btn-primary rounded">Add Vehicle</Link>
        </div>
      </div>
    </div>
);
}

export default Admin