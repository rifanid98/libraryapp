import React from 'react'
import {Login, Signup, Home, Detail } from '../pages'

const notfound = () => {
  return (
    <p>Not Found!</p>
  )
}

const appRoutes = [
 
  {
    name: "Detail",
    component: Detail,
    exact: true,
    path: "/detail"
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
