import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./Components/Users/Users.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import UserTask from "./Components/UserTask/UserTask.jsx";
import { persistStore } from "redux-persist";
import { persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";

// import router from "./Routes/Route.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/usertask/:id",
        element: <UserTask />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
