import React from "react";
import { Plus } from "lucide-react";
import LessonInput from "./LessonInput";

const LessonsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Lessons</h3>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </button>
      </div>

      {/* LessonInput component instances */}
      <div className="space-y-4">
        <LessonInput />       
      </div>
    </div>
  );
};

export default LessonsSection;
