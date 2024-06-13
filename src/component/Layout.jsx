import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { isAuthenticated, logout } from "../utils/auth";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      <div className="card">
        {/* <Header title="Landing Page Dashboard" /> */}

        <main>{children}</main>
        {authenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <a href="/login">Login</a> | <a href="/register">Create Account</a>
          </div>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
