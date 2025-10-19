// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Pages/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
