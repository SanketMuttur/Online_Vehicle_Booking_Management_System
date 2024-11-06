import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminAuthContext } from './AdminAuthContext';

const AdminNavbar = () => {

  const { CurrentAdmin, AdminLogout } = useContext(AdminAuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
      <div className="container">
        <Link className="navbar-brand fs-4" to="/">Online Vehicle Booking</Link>
        <button className="navbar-toggler rounded-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Admin">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AdminProfile">{CurrentAdmin?.name}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AddAdmin">Add Admin</Link>
            </li>
            <li className="nav-item ms-4">
              <Link className="nav-link btn btn-outline-danger border border-secondary position-relative rounded-4" onClick={AdminLogout} to="/">Logout</Link>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;