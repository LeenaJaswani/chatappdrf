import {Route,  Navigate, Outlet} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


const PrivateRoute = ({children, ...rest}) => {
    const { user } = useContext(AuthContext);

    if (!user) {

      return <Navigate to="/login" replace />;
    }
  
    return <Outlet />;};
export default PrivateRoute