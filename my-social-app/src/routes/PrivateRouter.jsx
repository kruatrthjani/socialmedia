import { Navigate, Outlet } from "react-router-dom";
import { path } from "./navigatepath";

function PrivateRouter() {
  const loguser = localStorage.getItem("loggedIn") || null;

  if (!loguser) {
    
    return <Navigate to={path.LOGIN} replace />; // Redirect to login if not logged in
  } else {    
    
    return <Outlet />; // Render child routes (e.g., Home)
  }
}

export default PrivateRouter;
