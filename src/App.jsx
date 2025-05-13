import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <RouterProvider router={router} />
    </>
  );
}

export default App
