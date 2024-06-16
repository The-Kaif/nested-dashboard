import React from "react";

// ErrorMessageInfo component displays an error message if provided
const ErrorMessageInfo = ({ errorMessage }) => {
  return (
    <div>
      {/* Display error message only if 'errorMessage' prop is provided */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ErrorMessageInfo;
