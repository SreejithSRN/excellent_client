function StudentDash() {
  return (
    <div className="p-8  bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Upcoming Courses */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Courses</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Web Development Bootcamp</span>
              <span className="text-gray-500">Starts in 3 days</span>
            </li>
            <li className="flex justify-between">
              <span>Data Science with Python</span>
              <span className="text-gray-500">Starts in 10 days</span>
            </li>
            <li className="flex justify-between">
              <span>UI/UX Design Masterclass</span>
              <span className="text-gray-500">Starts in 2 weeks</span>
            </li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Completed "HTML Basics" quiz</span>
              <span className="text-gray-500">1 hour ago</span>
            </li>
            <li className="flex justify-between">
              <span>Started "React Fundamentals" module</span>
              <span className="text-gray-500">3 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span>Submitted "JavaScript Challenge"</span>
              <span className="text-gray-500">Yesterday</span>
            </li>
          </ul>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress Tracker</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Web Development Bootcamp</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">45% Completed</p>
            </div>
            <div>
              <p className="text-gray-600">Data Science with Python</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">30% Completed</p>
            </div>
            <div>
              <p className="text-gray-600">UI/UX Design Masterclass</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">60% Completed</p>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 md:col-span-1 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Announcements</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">New Course Available: Advanced JavaScript</p>
              <p className="text-gray-600">We are excited to announce the release of the Advanced JavaScript course. Enroll today!</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Reminder: Quiz Deadline</p>
              <p className="text-gray-600">The deadline for the "HTML Basics" quiz is tomorrow. Make sure to submit your answers!</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Upcoming Webinar: Data Science Trends</p>
              <p className="text-gray-600">Join us for a live session on the latest trends in data science on Friday at 3 PM.</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-2 md:col-span-1 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resources</h2>
          <ul className="space-y-4">
            <li className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              <span className="font-semibold">JavaScript Documentation</span>
              <p className="text-gray-600 text-sm">Refer to the official documentation for learning JavaScript.</p>
            </li>
            <li className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              <span className="font-semibold">React Tutorial</span>
              <p className="text-gray-600 text-sm">Check out our detailed React tutorial to deepen your understanding.</p>
            </li>
            <li className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              <span className="font-semibold">UI/UX Design Guide</span>
              <p className="text-gray-600 text-sm">A complete guide to mastering UI/UX design principles.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;












// import UserSidebar from "../../components/common/Sidebar";

// function StudentDash() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <UserSidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-6">
//         <h1 className="mt-40">This is Student Dashboard</h1>
//       </div>
//     </div>
//   );
// }

// export default StudentDash;

















// import UserSidebar from "../../components/common/UserSidebar";

// function StudentDash() {
//   return (
//     <div>
//       <UserSidebar/>
//       <h1 className="mt-40">This is Student Dashboard</h1>
//     </div>
//   );
// }

// export default StudentDash;

// import UserSidebar from "../../components/common/UserSidebar";

// function StudentDash() {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 md:w-1/4 bg-gray-100">
//         <UserSidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-4 overflow-auto">
//         <h1 className="mt-40">This is the Student Dashboard</h1>
//       </div>
//     </div>
//   );
// }

// export default StudentDash;



