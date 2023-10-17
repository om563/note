import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import SignIn from "./Component/SignIn/SignIn";
import SignUp from "./Component/SignUp/SignUp";
import SignOut from "./Component/SignOut/SignOut";
import Notes from "./Component/Notes/Notes";
import UserContextProvider from "./Context/UserContext";
import ProtuctedRoute from "./Component/ProtuctedRoute/ProtuctedRoute";
import NotFound from "./Component/NotFound/NotFound";



export default function App() {

  let routers = createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {index:true,element:<SignUp/>},
      {path:"SignOut",element:<SignOut/>},
      {path:"SignIn",element:<SignIn/>},
      {path:"*",element:<NotFound/>},
      {path:"Notes",element:<ProtuctedRoute><Notes/></ProtuctedRoute>},
    ]}
  ])

  return <>
  <UserContextProvider>
    <RouterProvider router={routers}>

    </RouterProvider>
  </UserContextProvider>
  
  
  </>
}
