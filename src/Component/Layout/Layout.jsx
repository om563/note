import React from "react";
import './Layout.module.css'
import { Outlet } from "react-router-dom";

export default function Layout() {


  return <>
  <Outlet/>
  </>
}
