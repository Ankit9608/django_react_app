import react from "react"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { BrowserRouter,Routes,Route, Navigate} from "react-router-dom"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}
function LogoutRegister(){
  localStorage.clear()
  return <Register/>
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home/>
              </ProtectedRoutes>
            }
          />
          <Route path="/register" element={<LogoutRegister/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
