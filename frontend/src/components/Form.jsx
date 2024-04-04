// import { useState } from "react";
// import api from "../api"
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import '../styles/Form.css'

// function Form({route, method}){
//     const [username, setUsername]= useState("")
//     const [password, setPassword] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate=useNavigate()
//     const name = method==="login"?"Login":"Register"
//     console.log(method)

//     const handleSubmit=async(e)=>{
//         setLoading(true);
//         e.prevnetDefault();
//         console.log(method)
//         try{
//             console.log("try")
//             const res=await api.post(route,{username,password})
//             console.log(res)
//             if(method=="login'"){
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
//                 console.log("hi")
//                 navigate("/")
//             }
//             else{
//                 console.log("try else")

//                 console.log(username,password)
//                 navigate("/login")
//             }
//         }
//         catch(error){
//             console.log("catch")
//             alert(error)
//         }
//         finally{
//             console.log("finally")
//             // setLoading(false)
//         }


//     }
//     return <form  onSubmit={handleSubmit} className="form-container"> 
//     <h3>{name}</h3>
//     <input
//         className="form-input"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e)=>{setUsername(e.target.value)}}
//     />

//     <input
//         className="form-input"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e)=>{setPassword(e.target.value)}}
//     />
//     <button className="form-button" type="submit">{name}</button>
//     </form>
// }

// export default Form


import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import Loading from "./Loading";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                console.log("set item")
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
             {loading && <Loading />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form