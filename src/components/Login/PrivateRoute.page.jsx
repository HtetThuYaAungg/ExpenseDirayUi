import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const PrivateRoute = () => {

    // Fetching the user from the user context.
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;

    // If the user is not logged in we are redirecting them
    // to the login page. Otherwise we are letting them to
    // continue to the page as per the URL using <Outlet />.
    return !isLoggedIn ? <Navigate to={redirectLoginUrl} /> : <Outlet />;
}

export default PrivateRoute;