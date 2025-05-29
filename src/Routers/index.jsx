import React from "react";
import { StrictMode } from "react";
import "../index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import Home from "../Pages/home";
import Login from "../Pages/Auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/masuk",
    element: <Login />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
