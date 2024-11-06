import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    
    const UserSignIn = async (UserInfo) => {
        const res = await axios.post("http://localhost:5000/UserSignIn", UserInfo)
        setCurrentUser(res.data)
    }

    const UserSignOut = async () => {
        await axios.post("http://localhost:5000/UserSignOut", {})
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(CurrentUser))
    }, [CurrentUser])

    return(
        <AuthContext.Provider value={{CurrentUser, UserSignIn, UserSignOut}}>{children}</AuthContext.Provider>
    )
}