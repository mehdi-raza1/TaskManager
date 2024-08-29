// AppProviders.jsx
import React from 'react';
import { persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter ,Route} from "react-router-dom";
import Users from "../Components/Users/Users.jsx";
import UserTask from "../Components/UserTask/UserTask.jsx";
import App from '../App.jsx';
import UsersData from "../Components/HOC/UserHoc.jsx"
// import router from '../Routes/Route.js';

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


const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}>
          {children}
        </RouterProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
