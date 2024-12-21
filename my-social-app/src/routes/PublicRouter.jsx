import { Navigate, Outlet } from "react-router-dom";
import { path } from "./navigatepath";
import { useLocation } from "react-router-dom";
function PublicRouter() {
  const loguser = localStorage.getItem("loggedIn") || null;
  const location=useLocation()
  if (loguser) {
    
    return <Navigate to={path.HOME} replace />; // Redirect to home if logged in
  }
  if (location.pathname === "/") {
    return <Navigate to={path.LOGIN}/>;
  }
  return <Outlet />; // Render child routes (e.g., Login, Register)
}

export default PublicRouter;
