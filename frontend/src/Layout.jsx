import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CompleteProfileModal from "./components/Users/CompleteProfileModal.jsx";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <CompleteProfileModal />
      <Footer />
    </>
  );
}

export default Layout;
