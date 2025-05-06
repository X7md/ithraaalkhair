import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/pages/layout";
import { IndexPage } from "@/pages/index";
import { TestPage } from "@/pages/test";
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
        path: "test",
        element: <TestPage />,
        handle: {
          //test
          tab: TestPage.tab
        },
      }
    ]
  }
]);
