
import { useLocation } from "react-router-dom";

const StudentFailurePage = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname); // Debug log

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>Please try again.</p>
    </div>
  );
};

export default StudentFailurePage;
