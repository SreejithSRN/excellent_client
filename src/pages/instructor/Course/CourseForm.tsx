import React, { useState } from "react";

import PricingSection from './PricingSection';
import ThumbnailUpload from './ThumbnailUpload';
import LessonSection from './LessonSection';
import BasicCourseInfo from "./BasicCouseInfo";

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    language: "",
  });

  const handleCourseDataChange = (newData: any) => {
    setCourseData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data Submitted: ", courseData);
    // Here you can call an API or perform other actions with courseData
  };

  return (
    <form
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

      <div className="space-y-6">
        <BasicCourseInfo
          courseData={courseData}
          onCourseDataChange={handleCourseDataChange}
        />

        <PricingSection />
        <ThumbnailUpload />
        <LessonSection />

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Publish Course
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
