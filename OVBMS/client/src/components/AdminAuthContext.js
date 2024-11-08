import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate()

export const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
    const [CurrentAdmin, setCurrentAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null)

    const AdminLogin = async (AdminInfo) => {
        const res = await axios.post("http://localhost:5000/AdminLogin", AdminInfo);
        setCurrentAdmin(res.data);
    }

    const AdminLogout = async () => {
        try {
            await axios.post("http://localhost:5000/AdminLogout", {});
            setCurrentAdmin(null);
        } catch (error) {
            if (err.response && err.response.status === 401) {
                navigate("/AdminLogin");
              } else {
                setErr(err.response.data)
              }
        }
        
    }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(CurrentAdmin));
    }, [CurrentAdmin]);

    const ProtectedAdminRoute = ({ element }) => {
        if (!CurrentAdmin) {
            navigate("/AdminLogin");
        }
        return element;
    };

    return(
        <AdminAuthContext.Provider value={{ CurrentAdmin, AdminLogin, AdminLogout, ProtectedAdminRoute }}>{children}</AdminAuthContext.Provider>
    )
}
