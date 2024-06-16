// Badge component displays a status badge based on the 'status' prop
const Badge = ({ status }) => {

  // Render a span with class 'badge-live' if status is 'Live', otherwise 'badge-pending'
  return (
    <span className={status === "Live" ? 'badge-live' : 'badge-pending'}>
      {/* Display 'Live' if status is 'Live', otherwise display 'Pending' */}
      {status === "Live" ? "Live" : "Pending"}
    </span>
  );
};

export default Badge;
