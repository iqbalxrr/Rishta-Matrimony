import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";

// Layouts
import UserDashboardLayout from "../Pages/DashBoard/UserDashboardLayout";
import AdminDashboardLayout from "../Pages/DashBoard/AdminDashboardLayout";

// User Pages
import MyFavourites from "../Pages/DashBoard/User/MyFavourites";
import EditBiodata from "../Pages/DashBoard/User/EditBiodata";
import ViewBiodata from "../Pages/DashBoard/User/ViewBiodata";
import MyContactRequest from "../Pages/DashBoard/User/MyContactRequest";
import GotMarried from "../Pages/DashBoard/User/GotMarried";

// Admin Pages
import AdminDashboardHome from "../Pages/DashBoard/Admin/AdminDashboardHome";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import ApprovedPremium from "../Pages/DashBoard/Admin/ApprovedPremium";
import ApprovedContactRequest from "../Pages/DashBoard/Admin/ApprovedContactRequest";


// Route Guards (Assuming you'll implement them)
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        index: true,
        Component: HomePage,
      },
      {
        path: "/loginpage",
        Component: LoginPage,
      },
      {
        path: "/registerpage",
        Component: RegisterPage,
      },
      {
        path: "/biodataspage",
        Component: BiodatasPage,
      },
    ],
  },

  // ✅ User Dashboard Routes
  {
    path: "/userDashboard",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "editbio",
        element: <EditBiodata />,
      },
      {
        path: "view",
        element: <ViewBiodata />,
      },
      {
        path: "myContactRequest",
        element: <MyContactRequest />,
      },
      {
        path: "favourites",
        element: <MyFavourites />,
      },
      {
        path: "gotMarried",
        element: <GotMarried />,
      },
    ],
  },

  // ✅ Admin Dashboard Routes
  {
    path: "/adminDashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>


    ),
    children: [
      {
        path: "dashboard",
        index: true,
        element: <AdminDashboardHome />,
      },
      {
        path: "manage",
        element: <ManageUsers />,
      },
      {
        path: "approvedPremium",
        element: <ApprovedPremium />,
      },
      {
        path: "approvedContactRequest",
        element: <ApprovedContactRequest />,
      },
    ],
  },
]);
