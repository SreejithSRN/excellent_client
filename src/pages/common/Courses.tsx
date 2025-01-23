
function Courses() {
  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center underline decoration-wavy decoration-indigo-600">
        Explore Our Latest Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Course 1 */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-300 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-indigo-900">Web Development Bootcamp</h2>
          <p className="text-gray-700 mt-2">
            Learn HTML, CSS, JavaScript, and React to build modern web applications.
          </p>
          <p className="text-indigo-900 font-semibold mt-4">Duration: 12 weeks</p>
        </div>

        {/* Course 2 */}
        <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-300 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-900">Data Science with Python</h2>
          <p className="text-gray-700 mt-2">
            Dive into data analysis, machine learning, and AI with Python.
          </p>
          <p className="text-blue-900 font-semibold mt-4">Duration: 10 weeks</p>
        </div>

        {/* Course 3 */}
        <div className="bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-purple-900">UI/UX Design Masterclass</h2>
          <p className="text-gray-700 mt-2">
            Master the art of user-centric design with hands-on projects.
          </p>
          <p className="text-purple-900 font-semibold mt-4">Duration: 8 weeks</p>
        </div>

        {/* Course 4 */}
        <div className="bg-gradient-to-br from-indigo-200 via-purple-300 to-blue-400 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-900">Cloud Computing Basics</h2>
          <p className="text-gray-700 mt-2">
            Understand cloud platforms and learn to deploy scalable applications.
          </p>
          <p className="text-blue-900 font-semibold mt-4">Duration: 6 weeks</p>
        </div>

        {/* Course 5 */}
        <div className="bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-300 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-indigo-900">Cybersecurity Essentials</h2>
          <p className="text-gray-700 mt-2">
            Protect systems and networks with foundational cybersecurity skills.
          </p>
          <p className="text-indigo-900 font-semibold mt-4">Duration: 8 weeks</p>
        </div>

        {/* Course 6 */}
        <div className="bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 shadow-xl rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-purple-900">Digital Marketing Pro</h2>
          <p className="text-gray-700 mt-2">
            Learn SEO, social media marketing, and analytics to grow businesses online.
          </p>
          <p className="text-purple-900 font-semibold mt-4">Duration: 10 weeks</p>
        </div>
      </div>
    </div>
  );
}

export default Courses;






