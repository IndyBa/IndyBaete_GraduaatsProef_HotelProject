import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HotelManageCustomersPage from "./pages/HotelManageCustomersPage.jsx"
import ErrorPage from "./pages/errors/ErrorPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

const browserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HotelManageCustomersPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
