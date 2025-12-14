import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

/**
 * ProtectedRoute component ensures that only authenticated users
 * can access certain routes. If no valid accessToken is found,
 * the user is redirected to the login page.
 */
export default function ProtectedRoute() {
    const [accessToken] = useLocalStorage<string | null>("accessToken", null);

    // If no access token exists, redirect to login
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
}
