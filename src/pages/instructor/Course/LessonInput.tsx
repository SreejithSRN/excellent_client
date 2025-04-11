import React, { useEffect, useState } from "react";
import { Minus, Video } from "lucide-react";

interface LessonInputProps {
  index: number;
  values: {
    lessonNumber:number
    title: string;
    description: string;
    video: File | null|string;
    duration: string;
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onRemove: () => void;
  touched: any;
  errors: any;
}

const LessonInput: React.FC<LessonInputProps> = ({
  index,
  values,
  setFieldValue,
  onRemove,
  touched,
  errors,
}) => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

   // ✅ Set preview if video exists (useful for editing)
   useEffect(() => {
    setFieldValue(`lessons[${index}].lessonNumber`, index + 1);
    if (values.video && typeof values.video === "string") {
      setVideoPreview(values.video); // Show existing video on edit
    }
  }, [index, values.video, setFieldValue]);

  // Convert seconds to HH:MM:SS format
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Lesson {index + 1}</h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Lesson Title */}
        <label>Title</label>
        <input
          type="text"
          placeholder="Lesson Title"
          className={`block w-full rounded-md border-2 shadow-md ${
            touched?.title && errors?.title ? "border-red-500" : "border-gray-200"
          } focus:border-blue-500 focus:ring-blue-500`}
          value={values.title}
          onChange={(e) => setFieldValue(`lessons[${index}].title`, e.target.value)}
        />
        {touched?.title && errors?.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}

        {/* Lesson Description */}
        <label>Description</label>
        <textarea
          placeholder="Lesson Description"
          className={`block w-full rounded-md border-2 shadow-md ${
            touched?.description && errors?.description
              ? "border-red-500"
              : "border-gray-200"
          } focus:border-blue-500 focus:ring-blue-500`}
          rows={3}
          value={values.description}
          onChange={(e) => setFieldValue(`lessons[${index}].description`, e.target.value)}
        />
        {touched?.description && errors?.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}

        {/* Video Upload */}
        <label>Video Upload</label>
        <input
          type="file"
          accept="video/*"
          className={`block w-full mt-2 ${
            touched?.video && errors?.video ? "border-red-500" : "border-gray-200"
          }`}
          onChange={(event) => {
            if (event.currentTarget.files) {
              const file = event.currentTarget.files[0];
              setFieldValue(`lessons[${index}].video`, file);
              setVideoPreview(URL.createObjectURL(file)); // Set preview
            }
          }}
        />
        {touched?.video && errors?.video && (
          <p className="text-red-500 text-sm">{errors.video}</p>
        )}

        {/* Duration */}
        <label>Duration</label>
        <input
          type="text"
          placeholder="Duration (e.g., 01:30:00)"
          className={`block w-full rounded-md border-2 shadow-md ${
            touched?.duration && errors?.duration
              ? "border-red-500"
              : "border-gray-200"
          } focus:border-blue-500 focus:ring-blue-500`}
          value={values.duration}
          readOnly
        />
        {touched?.duration && errors?.duration && (
          <p className="text-red-500 text-sm">{errors.duration}</p>
        )}

        {/* Video Preview */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Video Preview</label>
          <div className="mt-2 w-full max-h-64 rounded-lg shadow-md bg-gray-100 flex items-center justify-center">
            {videoPreview ? (
              <video
                className="w-full max-h-64 rounded-lg"
                controls
                src={videoPreview}
                onLoadedMetadata={(e) => {
                  const duration = e.currentTarget.duration;
                  setFieldValue(`lessons[${index}].duration`, formatDuration(duration));
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Video className="h-8 w-8 text-gray-400" />
                <span className="text-sm">No video selected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonInput;



