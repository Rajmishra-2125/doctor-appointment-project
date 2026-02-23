import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children || <Outlet />}
      <Footer />
    </>
  );
}

export default Layout;
