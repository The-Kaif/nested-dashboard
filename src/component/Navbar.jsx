import { logout } from "@/utils/auth";
import Image from "next/image";
import { useState } from "react";

export default function Navbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

 
  return (
    <nav className="navbar">
      <div className="logo">
        <Image width={130} height={200} src={"/logo.png"} alt="logo" />
      </div>
      <div className="user-info">
        <Image width={30} height={26} src={"/user.png"} alt="logo" />&nbsp;
        <span className="user-name">Kaif</span>
        <button className="dropdown-button" onClick={toggleDropdown}>
        &#11167;
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
