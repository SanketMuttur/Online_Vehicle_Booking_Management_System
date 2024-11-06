import express from 'express'
import mysql from 'mysql2'
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"ovbms"
})

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())


app.post("/UserSignUp", (req, res)=>{

    const q = 'select * from customer where email = ?'

    db.query(q, [req.body.email], (err, data) =>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)
        
        const q = 'insert into customer (email, name, password, license_id, mobile_no, dob, city, state, pincode) values (?)';
        const values = [
            req.body.email,
            req.body.name,
            hashPassword,
            req.body.licenseNumber,
            req.body.mobileNumber,
            req.body.dob,
            req.body.city,
            req.body.state,
            req.body.pincode
        ]
    
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
            return res.status(200).json("User Signed up succesfully!!")
        })
        
    })
})

app.post("/UserSignIn", (req, res) =>{
    const q = 'select * from customer where email = ?';

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not found!")
        console.log(data[0])

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(400).json("Wrong Email ID or Password!")

        const token = jwt.sign({id:data[0].email}, "userjwtkey")
        const { password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly:true,
            secure: false,
            sameSite:"lax"
        }).status(200).json(data[0])
    })
})

app.post("/UserSignOut", (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been Logged Out!")
})

app.post("/AdminLogin", (req, res) =>{
    const q = 'select * from manager where email = ?';

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("Admin not found!")
        console.log(data[0])

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPasswordCorrect) return res.status(400).json("Wrong Email ID or Password!")

        const token = jwt.sign({id:data[0].email}, "adminjwtkey")
        const { password, ...other} = data[0]

        res.cookie("admin_access_token", token, {
            httpOnly:true,
            secure: false,
            sameSite:"lax"
        }).status(200).json(data[0])
    })
})

app.post("/AddAdmin", (req, res)=>{

    const q = 'select * from manager where email = ?'

    db.query(q, [req.body.email], (err, data) =>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("Admin already exists!")

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)
        
        const q = 'insert into manager (email, name, password) values (?)';
        const values = [
            req.body.email,
            req.body.name,
            hashPassword
        ]
    
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err)
            return res.status(200).json("Added Admin succesfully!!")
        })
    })
})

app.post("/AdminLogout", (req, res) => {
    res.clearCookie("admin_access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("Admin has been Logged Out!")
})

app.get("/Admin",(req, res)=>{
    const q = 'SELECT * FROM ovbms.vehicles;'
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/VehicleListings",(req, res)=>{
    const q = 'SELECT * FROM ovbms.vehicles;'
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/AddVehicle", (req, res)=>{
    const q = 'insert into vehicles (License_No, Vehicle_Name, Model_Year, Price_Per_Day, Seating_Capacity, Fuel_Type, Vehicle_Image, Vehicle_Overview) values (?)';
    const values = [
        req.body.License_No,
        req.body.Vehicle_Name,
        req.body.Model_Year,
        req.body.Price_Per_Day,
        req.body.Seating_Capacity,
        req.body.Fuel_Type,
        req.body.Vehicle_Image,
        req.body.Vehicle_Overview
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/Admin/:id", (req, res) => {
    const License_No = req.params.id
    const q = 'delete from vehicles where license_no = ?'

    db.query(q, [License_No], (err, data) => {
        if (err) return res.json(err)
        return res.json("Vehicle Deleted")
    })
})

app.get("/UpdateVehicle/:id", (req, res) => {
    const vehicle_license_no = req.params.id
    const q = 'SELECT * FROM vehicles WHERE License_No = ?'

    db.query(q, [vehicle_license_no], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    });
});

app.put("/UpdateVehicle/:id", (req, res) => {
    const vehicle_license_no = req.params.id
    const q = 'update vehicles set `License_No`=?, `Vehicle_Name`=?, `Model_Year`=?, `Price_Per_Day`=?, `Seating_Capacity`=?, `Fuel_Type`=?, `Vehicle_Image`=?, `Vehicle_Overview`=? where License_No = ?'

    const values = [
        req.body.License_No,
        req.body.Vehicle_Name,
        req.body.Model_Year,
        req.body.Price_Per_Day,
        req.body.Seating_Capacity,
        req.body.Fuel_Type,
        req.body.Vehicle_Image,
        req.body.Vehicle_Overview
    ]

    db.query(q, [...values, vehicle_license_no], (err, data) => {
        if (err) return res.json(err)
        return res.json("Vehicle Info has been Updated Successfully")
    })
})

app.listen(5000, ()=>{
    console.log("Connected to Backend")
})