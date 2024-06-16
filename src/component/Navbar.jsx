import { logout } from "@/utils/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage on component mount
    setUser(JSON.parse(localStorage.getItem("user_paper")));
  }, []);

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo section with a clickable link */}
      <div onClick={() => router.push("/")} className="logo">
        <Image width={130} height={200} src={"/logo.svg"} alt="logo" />
      </div>
      {/* User information section */}
      <div className="user-info">
        <FaUser size={17} />
        &nbsp;
        <span className="user-name">{user}</span>
        {/* Dropdown button to toggle visibility of dropdown menu */}
        <button className="dropdown-button" onClick={toggleDropdown}>
          <FaAngleDown size={17} />
        </button>
        {/* Dropdown menu with logout option */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button
              onClick={() => {
                // Logout functionality with success toast
                toast.success("Logout Successfully");
                logout();
              }}
              className="btnWithICon"
            >
              <FiLogOut size={15} />
              &nbsp;Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
