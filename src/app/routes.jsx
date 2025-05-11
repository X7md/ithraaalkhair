import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/pages/layout";
import { IndexPage } from "@/pages/index";
import { SurveyPage } from "@/pages/survey";
import { Login } from "@/pages/login";

// Mock authentication function (replace with your actual logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Example: Check if a token exists in localStorage
};
// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        handle: {
          tab: IndexPage.tab
        },
      },
      {
        path: "survey",
        element: <ProtectedRoute element={<SurveyPage />} />,
        handle: {
          //survey
          tab: SurveyPage.tab
        },
      },
      {
        path: "login",
        element: <Login />,
        handle: {
          //login
          tab: Login.tab
        },
      }
    ]
  }
]);
