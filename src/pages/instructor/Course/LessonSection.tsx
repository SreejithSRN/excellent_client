import React from "react";
import { Plus } from "lucide-react";
import LessonInput from "./LessonInput";
import { FormikErrors, FormikTouched } from "formik";

interface LessonsSectionProps {
  values: {
    lessons: { title: string; description: string; video: File | null; duration: string }[];
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: FormikTouched<{ lessons: any[] }>;
  errors: FormikErrors<{ lessons: any[] }>;
}

const LessonsSection: React.FC<LessonsSectionProps> = ({ values, setFieldValue, touched, errors }) => {
  // Add a new lesson
  const addLesson = () => {
    setFieldValue("lessons", [...values.lessons, { title: "", description: "", video: null, duration: "" }]);
  };

  // Remove a lesson
  const removeLesson = (index: number) => {
    const updatedLessons = values.lessons.filter((_, i) => i !== index);
    setFieldValue("lessons", updatedLessons);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Lessons</h3>

      <div className="space-y-4">
        {values.lessons.map((lesson, index) => (
          <LessonInput
            key={index}
            index={index}
            values={lesson}
            setFieldValue={setFieldValue}
            onRemove={() => removeLesson(index)}
            touched={(touched?.lessons as FormikTouched<any>[] | undefined)?.[index] || {}}
            errors={(errors?.lessons as FormikErrors<any>[] | undefined)?.[index] || {}}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={addLesson}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonsSection;