import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
    const [CurrentAdmin, setCurrentAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null)

    const AdminLogin = async (AdminInfo) => {
        const res = await axios.post("http://localhost:5000/AdminLogin", AdminInfo);
        setCurrentAdmin(res.data);
    }

    const AdminLogout = async () => {
        await axios.post("http://localhost:5000/AdminLogout", {});
        setCurrentAdmin(null);
        }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(CurrentAdmin));
    }, [CurrentAdmin]);

    return (
        <AdminAuthContext.Provider value={{ CurrentAdmin, AdminLogin, AdminLogout }}>{children}</AdminAuthContext.Provider>
    )
}
