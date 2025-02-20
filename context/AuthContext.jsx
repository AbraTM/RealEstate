import React from "react";
import Loading from "../src/components/loading/loading";

const AuthContext = React.createContext()
export const useAuth = () => React.useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const checkAuth = async() => {
            try {
                const res = await fetch("http://localhost:5000/auth/check", {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json();
                if(data.isLoggedIn){
                    setUser(data.user)
                    setIsLoggedIn(data.isLoggedIn)
                }else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Authentication Failed\n" + error)
            }
            setLoading(false)
        }
        checkAuth()
    }, [])

    if(loading){
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            { children }
        </AuthContext.Provider>
    )
}