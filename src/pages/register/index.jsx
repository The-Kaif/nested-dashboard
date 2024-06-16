import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "../../utils/auth";
import Link from "next/link";
import ErrorMessageInfo from "../../component/ErrorMessage";
import toast from "react-hot-toast";
import { SiGnuprivacyguard } from "react-icons/si";
import Image from "next/image";

// Function to format state name for error messages
const correctUserStateName = (stateName) => {
  const nameMapping = {
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
  };

  return nameMapping[stateName] || stateName;
};

export default function Register() {
  const [user, setUser] = useState({ // State to manage user input for username, password, and confirmPassword
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ // State to manage error messages for username, password, and confirmPassword
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const router = useRouter(); // Next.js router instance

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const hasErrors = checkValidation(); // Check for validation errors
    if (hasErrors) {
      toast.error("Please fix the errors"); // Display toast message for errors
      return;
    }

    if (user.password !== user.confirmPassword) { // Check if passwords match
      toast.error("Passwords do not match"); // Display toast message for mismatched passwords
      return;
    }

    if (register(user.username, user.password)) { // Attempt registration with provided credentials
      toast.success("Registration successful! Please log in."); // Display success toast message
      router.push("/login"); // Redirect to login page after successful registration
    } else {
      toast.error("Username already exists"); // Display error toast for existing username
    }
  };

  // Function to validate form inputs
  const checkValidation = () => {
    const newErrors = { ...error }; // Copy current error state
    let hasErrors = false; // Flag to track if there are errors

    // Iterate over keys (username, password, and confirmPassword)
    Object.keys(user).forEach((key) => {
      if (!user[key]) { // Check if input is empty
        newErrors[key + "Error"] = `${correctUserStateName(key)} is required`; // Update error message
        hasErrors = true; // Set flag to true indicating there are errors
      } else {
        newErrors[key + "Error"] = ""; // Clear error message if input is not empty
      }
    });

    setError(newErrors); // Update error state with new errors
    return hasErrors; // Return whether there are validation errors
  };

  // JSX structure for registration form
  return (
    <div className="card-container">
      <div style={{ marginTop: "3em" }}>
        <Image width={130} height={50} src={"/logo.svg"} alt="logo" /> {/* Logo displayed */}
      </div>
      <div className="card">
        <h2>Create Account</h2> {/* Heading for the registration form */}
        <form onSubmit={handleSubmit}> {/* Form for handling registration */}
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
            <ErrorMessageInfo errorMessage={error.usernameError} /> {/* Component to display username error */}
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
            <ErrorMessageInfo errorMessage={error.passwordError} /> {/* Component to display password error */}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="password"
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({
                  ...user,
                  confirmPassword: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    confirmPasswordError: "",
                  });
                }
              }}
            />
            <ErrorMessageInfo errorMessage={error.confirmPasswordError} /> {/* Component to display confirmPassword error */}
          </div>
          <button type="submit" className="sign-in-up-buton btnWithICon">
            <SiGnuprivacyguard size={15} />
            &nbsp;Register
          </button>
        </form>
        <p className="redirect">
          Already have an account?&nbsp;
          <Link href="/login" className="register-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
