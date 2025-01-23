import React from "react";
import { Minus, Video } from "lucide-react";

const LessonInput: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Lesson</h4>
        <button
          type="button"
          className="text-red-600 hover:text-red-700"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Lesson Title"
          className="block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
        />
        <textarea
          placeholder="Lesson Description"
          className="block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Video
          </label>
          <input
            type="file"
            accept="video/*"
            className="block mt-2"
          />
        </div>
        <input
          type="text"
          placeholder="Duration (e.g., 1:30:00)"
          className="block w-full rounded-md border-gray-200 border-2 shadow-md focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Video Preview
          </label>
          <div className="mt-2 w-full max-h-64 rounded-lg shadow-md bg-gray-100 flex items-center justify-center">
            <Video className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500">Video Preview Area</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInput;

