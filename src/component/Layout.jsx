import React from "react";
import Navbar from "./Navbar";

/**
 * Layout component wraps the main content of the application with a Navbar.
 * @param {object} children - The child components or elements to be rendered within the layout.
 */
const Layout = ({ children }) => {
  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />
      <div className="container">
        {/* Main content area */}
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
