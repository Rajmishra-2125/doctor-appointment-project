import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingAgent from "../../../components/Agent/FloatingAgent";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children || <Outlet />}
      <FloatingAgent />
      <Footer />
    </>
  );
}

export default Layout;
