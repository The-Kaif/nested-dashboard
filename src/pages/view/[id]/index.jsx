import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  getLandingPage,
  updateLandingPage,
  getLandingPages,
} from "../../../utils/storage";
import dynamic from "next/dynamic";
import { useScreenshot } from "use-react-screenshot";
import { IoMdArrowRoundBack } from "react-icons/io";

// Dynamic imports for components
const Header = dynamic(() => import("../../../component/Header"));
const Footer = dynamic(() => import("../../../component/Footer"));
const TextBlock = dynamic(() => import("../../../component/TextBlock"));
const ImageComponent = dynamic(() =>
  import("../../../component/ImageComponent")
);

// Mapping of component types to their corresponding dynamic components
const components = { Header, Footer, TextBlock, ImageComponent };

export default function View() {
  const router = useRouter();
  const { id } = router.query; // Fetching the id from router query
  const [page, setPage] = useState(null); // State to hold the landing page data
  const [image, takeScreenshot] = useScreenshot(); // Hook to capture screenshot
  const ref = useRef(null); // Reference to the div element for screenshot capture

  // Effect to fetch landing page data when id changes
  useEffect(() => {
    if (id) {
      const landingPage = getLandingPage(id); // Fetch landing page data
      setPage(landingPage); // Update state with landing page data
    }
  }, [id]);

  // Effect to take screenshot when page and id are loaded
  useEffect(() => {
    if (page && id) {
      handleTakeScreenshot(id); // Function to capture and update screenshot
    }
  }, [page, id]);

  // Function to capture screenshot and update landing page data
  const handleTakeScreenshot = async (id) => {
    const screenshot = await takeScreenshot(ref.current, {
      width: 250,
      height: 250,
    }); // Capture screenshot of the ref element

    // Update landing page data with new screenshot
    const updatedPage = {
      ...getLandingPages().find((page) => page.id === id), // Find the page by id
      preview: screenshot, // Add screenshot to the page data
    };

    updateLandingPage(id, updatedPage); // Update storage with updated page data
    setPage(updatedPage); // Update local state with new screenshot
  };

  // Render loading message if page data is not loaded yet
  if (!page) return <div>Loading...</div>;

  // JSX structure to render the landing page and components
  return (
    <>
      <button
        onClick={() => {
          router.back(); // Navigate back to previous page
        }}
        style={{ display: "flex", marginTop: "3em" }}
      >
        <IoMdArrowRoundBack size={15} />
        &nbsp;Back
      </button>
      <div ref={ref} className="viewContainer">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        {/* Render each component based on its type */}
        {page.components.map((component, index) => {
          const Component = components[component.type]; // Get component type
          return Component ? (
            <Component key={index} {...component.props} /> // Render component with props
          ) : null;
        })}
      </div>
    </>
  );
}
