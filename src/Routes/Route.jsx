// router.js
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Users from "../Components/Users/Users.jsx";
import UserTask from "../Components/UserTask/UserTask.jsx";
import App from '../App.jsx';

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <App />,
//       children: [
//         {
//           path: "/",
//           element: <Users />,
//         },
//         {
//           path: "/usertask/:id",
//           element: <UserTask />,
//         },
//       ],
//     },
// ]);
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<App />}>
//             <Route index element={<Users/>}/>
//             <Route path="/Usertask/:id" element={<UserTask/>}/>
//         </Route>
//     )
// );

export default router;
