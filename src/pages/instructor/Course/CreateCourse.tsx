import CourseForm from "./CourseForm";


function CreateCourse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="py-2" id="create-course">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create Your Course
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Share your knowledge with our global community of learners
            </p>
          </div>
          <CourseForm />
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;

