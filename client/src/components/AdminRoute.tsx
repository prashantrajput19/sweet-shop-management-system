import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import useLocalStorage from "@/hooks/useLocalStorage";

/**
 * AdminRoute component ensures that only authenticated users with admin role
 * can access certain routes. If no valid accessToken is found, redirects to login.
 * If user is authenticated but not an admin, redirects to dashboard.
 */
export default function AdminRoute() {
    const [accessToken] = useLocalStorage<string | null>("accessToken", null);
    const { user, isLoading } = useUser();

    // If no access token exists, redirect to login
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // Wait for user data to load
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is not an admin, redirect to dashboard
    if (user && user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    // If authenticated and admin, render the child routes
    return <Outlet />;
}
