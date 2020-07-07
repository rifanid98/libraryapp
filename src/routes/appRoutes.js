import React from 'react'
import { Login, Signup, Home, Detail, Logout, Index as DashboardBooks, } from 'pages';

const notfound = () => {
  return (
    <p>Not Found!</p>
  )
}

const appRoutes = [

  {
    name: "Dashboard",
    component: DashboardBooks,
    exact: true,
    path: "/dashboard/:page"
  },
  {
    name: "Detail",
    component: Detail,
    exact: true,
    path: "/detail/:id"
  },
  {
    name: "Home",
    component: Home,
    exact: true,
    path: "/home"
  },
  {
    name: "Login",
    component: Login,
    exact: true,
    path: "/login"
  },
  {
    name: "Logout",
    component: Logout,
    exact: true,
    path: "/logout"
  },
  {
    name: "Sign Up",
    component: Signup,
    exact: true,
    path: "/signup"
  },
  {
    name: "Not Found",
    component: notfound,
    exact: false,
    path: "*"
  }
];

export default appRoutes;
