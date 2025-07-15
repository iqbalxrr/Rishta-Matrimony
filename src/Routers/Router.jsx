import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";

export const router = createBrowserRouter([
      {
        path:"/",
        Component:MainLayout,
        children:[
            {
                path:"/",
                index:true,
                Component:HomePage
            },
            {
              path:"/loginpage",
              Component:LoginPage
            },
            {
              path:"/registerpage",
              Component:RegisterPage,
            }
        ]
      }
])

