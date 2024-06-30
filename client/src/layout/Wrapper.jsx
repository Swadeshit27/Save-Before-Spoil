import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Wrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
