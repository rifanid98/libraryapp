import React from 'react'
import {Login } from '../pages'

// import { Login, Signup } from "../pages";

const notfound = () => {
  return (
    <p>Not Found!</p>
  )
}

const appRoutes = [
 
  {
    name: "Login",
    component: Login,
    exact: true,
    path: "/login"
  },
  // {
  //   name: "Sign Up",
  //   component: Signup,
  //   exact: true,
  //   path: "/signup"
  // },
  {
    name: "Not Found",
    component: notfound,
    exact: false,
    path: "*"
  }
];

export default appRoutes;
