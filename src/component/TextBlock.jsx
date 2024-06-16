import React from "react";

// Functional component TextBlock that accepts a 'text' prop
const TextBlock = ({ text }) => (
  <div>
    {/* Render the 'text' prop within a <p> tag */}
    <p>{text}</p>
  </div>
);

export default TextBlock;
