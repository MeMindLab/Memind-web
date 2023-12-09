import { createBrowserRouter } from "react-router-dom";
import Root from "../components/root";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
