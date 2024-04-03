import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'

function Form({route, method}){
    const [username, setUsername]= useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const name = method==="login"?"Login":"Register"
    // console.log(method)

    const handleSubmit=async(e)=>{
        setLoading(true);
        e.prevnetDefault();
        console.log(method)
        try{
            const res=await api.post(route,{username,password})
            if(method=='login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/")
            }
            else{
                console.log(username,password)
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        }
        finally{
            setLoading(false)
        }


    }
    return <form  className="form-container"> 
    <h3>{name}</h3>
    <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
    />

    <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
    />
    <button className="form-button" onClick={handleSubmit} type="submit">{name}</button>
    </form>
}

export default Form