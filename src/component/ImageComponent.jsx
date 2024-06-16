import Image from "next/image";
import React from "react";

/**
 * ImageComponent displays an image with optional source and alternate text.
 * @param {string} src - The URL of the image source.
 * @param {string} alt - The alternate text for the image.
 */
const ImageComponent = ({ src, alt }) => (
  <div>
    {/* Conditional rendering: Display the image if src is provided */}
    {src ? (
      // <img style={{ maxWidth: "500px", height: "500px" }} src={src} alt={alt} />
      <Image className="maxContent" src={src} alt={alt} width={500} height={500}/>
    ) : (
      "" // Display nothing if src is not provided
    )}
  </div>
);

export default ImageComponent;
