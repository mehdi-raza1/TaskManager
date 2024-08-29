import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppProviders from "./app/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>
);
