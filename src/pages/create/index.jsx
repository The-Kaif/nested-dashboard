import { useState } from "react";
import { createLandingPage } from "../../utils/storage";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Create() {
  const [title, setTitle] = useState(""); // State for holding the title input value
  const [description, setDescription] = useState(""); // State for holding the description input value
  const router = useRouter(); // Next.js router instance for navigation

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate if title or description is empty
    if (title === "" || description === "") {
      toast.error("Please fill both the title and description");
      return; // Exit function early if validation fails
    }
    const id = Date.now().toString(); // Generate unique ID based on current timestamp
    // Create a new landing page with title, description, and empty components array
    createLandingPage({ title, description, components: [] }, id);
    router.push(`/edit/${id}`); // Navigate to edit page for the newly created landing page
  };

  return (
    <div className="card-container">
      <h2>Create Landing Page</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
          />
          <textarea
            style={{ paddingTop: "1em" }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
          />
          <button
            style={{ marginRight: "2em" }}
            className="sign-in-up-buton"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
