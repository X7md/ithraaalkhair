import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/pages/layout";
import { IndexPage } from "@/pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    //   {
    //     path: "test",
    //     element: <TestPage />,
    //   }
    ]
  }
]);
