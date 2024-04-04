// import {Navigate} from "react-router-dom"
// import {jwtDecode} from "jwt-decode"
// import api from "../api"
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
// import { useState ,useEffect} from "react"

// function ProtectedRoutes({children}){
//     const [isAuthorized, setIsAuthorized] = useState(null)
//     useEffect(()=>{
//         console.log("catching")
//         auth().catch(()=>setIsAuthorized(false))
//     },[])
//     const refreshToken = async()=>{
//         const refreshToken=localStorage.getItem(REFRESH_TOKEN)
//         console.log( "refresh 8")
//         try{
//             console.log("refresh ")
//             const res= await api.post("/api/token/refresh/",{
//                 refresh: refreshToken
//             });
//             if(res.send===200){
//                 console.log("refresh 1")
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)

//             }else{
//                 console.log("refresh 2")
//                 // setIsAuthorized(false)
//             }

//         }catch(error){
//             console.log("refresh 3")
//             console.log(error);
//             // setIsAuthorized(false)
//         }

//     }
//     const auth= async()=>{
//         console.log("auth")
//         const token = localStorage.get(access)
//         console.log("auth2")
//         console.log(token)
//         if(!token){
//             console.log("not token")
//             // setIsAuthorized(false)
//             return
//         }
//         const decoded = jwtDecode(token)
//         const tokenExpiraton = decoded.exp
//         const now= Date.now()/1000

//         if (tokenExpiraton < now){
//             console.log("hi 2")
//             await refreshToken()
//         }
//         else{
//             console.log("hi 1")
//             // setIsAuthorized(true)
//         }

//     }

//     if(isAuthorized===null){
//         return <div>Loading...</div>
//     }

//     return isAuthorized? children:<Navigate to="/login"/>
// }
// export default ProtectedRoutes


import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log(token)
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;