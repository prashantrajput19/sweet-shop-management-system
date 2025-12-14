import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

/**
 * PublicRoute component prevents authenticated users from accessing
 * public pages like login and register. If a valid accessToken is found,
 * the user is redirected to the dashboard.
 */
export default function PublicRoute() {
    const [accessToken] = useLocalStorage<string | null>("accessToken", null);

    // If access token exists, redirect to dashboard
    if (accessToken) {
        return <Navigate to="/dashboard" replace />;
    }

    // If not authenticated, render the child routes (login/register)
    return <Outlet />;
}
