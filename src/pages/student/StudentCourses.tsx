

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentCourses = () => {
  const location = useLocation(); // Get navigation state

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  return (
    <div>
      <ToastContainer/>
      <h1>This is the student courses page</h1>
    </div>
  );
};

export default StudentCourses;

