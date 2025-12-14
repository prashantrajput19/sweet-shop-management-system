import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import './index.css'
import App from "./App";
import NotFound from "./pages/not-found";
import { Toaster } from "sonner";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PurchasedPage from "./pages/purchased";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import AdminPage from "./pages/admin";
import { UserProvider } from "./contexts/UserContext";
import HomePage from "./pages/home";
import { setupAxiosInterceptors } from "./lib/axiosInterceptor";

// Initialize axios interceptors for automatic token refresh
setupAxiosInterceptors();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Protected routes - require authentication
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "purchased",
            element: <PurchasedPage />,
          },
        ],
      },
      // Admin routes - require authentication AND admin role
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin",
            element: <AdminPage />,
          },
        ],
      },
      // Public routes - redirect to dashboard if already authenticated
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
