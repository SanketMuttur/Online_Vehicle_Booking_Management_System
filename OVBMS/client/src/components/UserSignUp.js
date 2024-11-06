import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserSignUp() {
  
  const navigate = useNavigate()

  const [UserInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    licenseNumber: '',
    mobileNumber: '',
    dob: '',
    city: '',
    state: '',
    pincode: ''
  })

  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:5000/UserSignUp",UserInfo)
        alert("User Signed Up Successfully")
        navigate("/")
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div>
        <div className='d-flex bg-secondary justify-content-center align-items-center vh-100'>
            <form className='bg-light p-4 rounded-5 shadow'style={{ width: '400px' }} onSubmit={handleSubmit}>

                <h1 className="text-center">Sign Up</h1><br/><br/>

                <input className="form-control rounded-5" onChange={handleChange} name='name' type='text' placeholder='Name' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='email' type='email' placeholder='Email' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='password' type='password' placeholder='Password' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='licenseNumber' type='text' placeholder='License Number' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='mobileNumber' type='tel' placeholder='Mobile Number' pattern="^[789]\d{9}$" title="Please enter a valid Number" required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='dob' type='date' placeholder='Date of Birth' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='city' type='text' placeholder='City' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='state' type='text' placeholder='State' required/><br/>
                <input className="form-control rounded-5" onChange={handleChange} name='pincode' type='text' placeholder='Pincode' pattern="^\d{6}$" required/><br/><br/>

                <div className='text-center'>
                  <button type="submit" className="btn btn-primary border btn-block rounded-5 w-100">Sign Up</button><br/><br/>
                  {err && (<div className="alert alert-danger" role="alert"><strong>Error:</strong> <span className="fw-bold">{err}</span></div>)}
                </div>

            </form>
        </div>
    </div>
  )
}

export default UserSignUp