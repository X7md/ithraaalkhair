import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "@/pages/layout";
import { IndexPage } from "@/pages/index";
import { Login } from "@/pages/login";
import { NusukImtithal } from "@/pages/nusuk-imtithal";

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
        path: "nusuk-imtithal",
        element: <NusukImtithal />,
        handle: { tab: NusukImtithal.tab },
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
  scrollBehavior: "auto"
});
