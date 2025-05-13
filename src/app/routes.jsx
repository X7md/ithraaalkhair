import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/pages/layout";
import { IndexPage } from "@/pages/index";
import { SurveyPage } from "@/pages/survey";
import { Login } from "@/pages/login";

const useAuth = () => {
  const isAuthenticated = () => !!localStorage.getItem("authToken");
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const routes = [
  {
    path: "/login",
    element: <Login />,
    handle: { tab: Login.tab },
  },
  {
    path: "/",
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <IndexPage />,
        handle: { tab: IndexPage.tab },
      },
      {
        path: "survey",
        element: <SurveyPage />,
        handle: { tab: SurveyPage.tab },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
