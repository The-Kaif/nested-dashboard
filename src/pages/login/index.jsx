import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../utils/auth";
import Link from "next/link";
import ErrorMessageInfo from "../../component/ErrorMessage";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";

// Function to format state name for error messages
const correctUserStateName = (stateName) => {
  const nameMapping = {
    username: "Username",
    password: "Password",
  };

  return nameMapping[stateName] || stateName;
};

export default function Login() {
  const router = useRouter(); // Next.js router instance
  const [user, setUser] = useState({
    // State to manage user input for username and password
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    // State to manage error messages for username and password
    usernameError: "",
    passwordError: "",
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const hasErrors = checkValidation(); // Check for validation errors
    if (hasErrors) {
      toast.error("Please fix the errors"); // Display toast message for errors
      return;
    }
    if (login(user.username, user.password)) {
      // Attempt login with provided credentials
      toast.success(`${user.username} logged in successfully`); // Display success toast message
      router.push("/"); // Redirect to home page on successful login
    } else {
      toast.error("Invalid credentials"); // Display error toast for invalid credentials
    }
  };

  // Function to validate form inputs
  const checkValidation = () => {
    const newErrors = { ...error }; // Copy current error state
    let hasErrors = false; // Flag to track if there are errors

    // Iterate over keys (username and password)
    Object.keys(user).forEach((key) => {
      if (!user[key]) {
        // Check if input is empty
        newErrors[key + "Error"] = `${correctUserStateName(key)} is required`; // Update error message
        hasErrors = true; // Set flag to true indicating there are errors
      } else {
        newErrors[key + "Error"] = ""; // Clear error message if input is not empty
      }
    });

    setError(newErrors); // Update error state with new errors
    return hasErrors; // Return whether there are validation errors
  };

  // JSX structure for login form
  return (
    <div className="card-container">
      <div style={{ marginTop: "3em" }}>
        <Image width={130} height={50} src={"/logo.svg"} alt="logo" />{" "}
        {/* Logo displayed */}
      </div>

      <div className="card">
        <h2>Login</h2> {/* Heading for the login form */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form for handling login */}
          <div className="form-group">
            <input
              type="text"
              className="username-input"
              placeholder="Username"
              value={user.username}
              onChange={(e) => {
                setUser({
                  ...user,
                  username: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    usernameError: "",
                  });
                }
              }}
            />
            <ErrorMessageInfo errorMessage={error.usernameError} />{" "}
            {/* Component to display username error */}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    passwordError: "",
                  });
                }
              }}
            />
            <ErrorMessageInfo errorMessage={error.passwordError} />{" "}
            {/* Component to display password error */}
          </div>
          <button type="submit" className="sign-in-up-buton btnWithICon">
            <FiLogIn size={15} />
            &nbsp;Login
          </button>
        </form>
        <p className="redirect">
          Don't have an account?&nbsp;
          <Link href="/register" className="register-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
