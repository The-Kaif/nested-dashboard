import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLandingPage, updateLandingPage } from "../../../utils/storage";
import dynamic from "next/dynamic";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";

// Dynamic imports for components
const Header = dynamic(() => import("../../../component/Header"));
const Footer = dynamic(() => import("../../../component/Footer"));
const TextBlock = dynamic(() => import("../../../component/TextBlock"));
const ImageComponent = dynamic(() =>
  import("../../../component/ImageComponent")
);

// Mapping of component types to their corresponding dynamic imports
const components = { Header, Footer, TextBlock, ImageComponent };

export default function Edit() {
  const router = useRouter(); 
  const { id } = router.query; // Extracting 'id' parameter from router query
  const [page, setPage] = useState(null); // State to store landing page data

  // Effect to fetch landing page data when 'id' changes
  useEffect(() => {
    if (id) {
      setPage(getLandingPage(id)); // Fetch landing page data based on 'id'
    }
  }, [id]);

  // Function to add a new component to the page
  const handleAddComponent = (type) => {
    const newComponent = { type, props: {} }; // New component object
    setPage((prevPage) => ({
      ...prevPage,
      components: [...prevPage.components, newComponent], // Adding new component to page state
    }));
  };

  // Function to handle property change for a component
  const handlePropChange = (index, prop, value) => {
    const updatedComponents = [...page.components]; // Copying components array
    updatedComponents[index] = {
      ...updatedComponents[index],
      props: {
        ...updatedComponents[index].props,
        [prop]: value, // Updating specific property of the component
      },
    };
    setPage((prevPage) => ({
      ...prevPage,
      components: updatedComponents, // Updating page state with updated components
    }));
  };

  // Function to delete a component from the page
  const handleDeleteComponent = (index) => {
    const updatedComponents = page.components.filter((_, i) => i !== index); // Filtering out the component at the specified index
    setPage((prevPage) => ({
      ...prevPage,
      components: updatedComponents, // Updating page state without the deleted component
    }));
  };

  // Function to save changes to the landing page
  const handleSave = () => {
    updateLandingPage(id, page); // Updating landing page data in storage
    router.push(`/view/${id}`); // Redirecting to view page after saving
  };

  // Rendering while page data is loading
  if (!page) return <div>Loading...</div>;

  // Rendering the edit page once page data is available
  return (
    <>
      {/* Back button to navigate back to the previous page */}
      <button
        onClick={() => {
          router.back(); // Navigates back in the router history
        }}
        style={{ display: "flex", marginTop: "3em" }}
      >
        <IoMdArrowRoundBack size={15} />
        &nbsp;Back
      </button>
      {/* Heading for the edit page */}
      <h2>Edit Landing Page</h2>
      {/* Section to add new components */}
      <div className="center">
        <button onClick={() => handleAddComponent("Header")}>Add Header</button>
        <button onClick={() => handleAddComponent("Footer")}>Add Footer</button>
        <button onClick={() => handleAddComponent("TextBlock")}>
          Add Text Block
        </button>
        <button onClick={() => handleAddComponent("ImageComponent")}>
          Add Image
        </button>
      </div>
      {/* Section to display and manage existing components */}
      <div
        style={{
          margin: "auto",
          width: "50%",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        {page.components.map((component, index) => {
          const Component = components[component.type]; // Dynamic component based on component type
          return (
            <div key={index}>
              <Component {...component.props} /> {/* Rendering the component */}
              {/* Input fields specific to certain component types */}
              {component.type === "Header" && (
                <input
                  type="text"
                  placeholder="Title"
                  value={component.props.title || ""}
                  onChange={(e) =>
                    handlePropChange(index, "title", e.target.value)
                  }
                />
              )}
              {component.type === "Footer" && (
                <input
                  type="text"
                  placeholder="Footer Content"
                  value={component.props.content || ""}
                  onChange={(e) =>
                    handlePropChange(index, "content", e.target.value)
                  }
                />
              )}
              {component.type === "TextBlock" && (
                <input
                  placeholder="Write Something..."
                  value={component.props.text || ""}
                  onChange={(e) =>
                    handlePropChange(index, "text", e.target.value)
                  }
                />
              )}
              {component.type === "ImageComponent" && (
                <>
                  <input
                    style={{ width: "30%" }}
                    type="text"
                    placeholder="Image URL"
                    value={component.props.src || ""}
                    onChange={(e) =>
                      handlePropChange(index, "src", e.target.value)
                    }
                  />
                  <input
                    style={{ marginLeft: "1em", width: "30%" }}
                    type="text"
                    placeholder="Alt Text"
                    value={component.props.alt || ""}
                    onChange={(e) =>
                      handlePropChange(index, "alt", e.target.value)
                    }
                  />
                </>
              )}
              {/* Button to delete the component */}
              <button
                style={{ marginLeft: "1em" }}
                onClick={() => handleDeleteComponent(index)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      {/* Section for save, preview, and publish buttons */}
      <div className="center">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => router.push(`/view/${id}`)}>Preview</button>
        {/* Button to publish the landing page */}
        <button
          onClick={() => {
            toast.success(`Now your page is live`); // Success toast message
            page.status = "Live"; // Updating page status to 'Live'
            handleSave(); // Saving the updated page status
          }}
        >
          Publish
        </button>
      </div>
    </>
  );
}
