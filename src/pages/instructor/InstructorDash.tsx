function InstructorDash() {
  return (
    <div className="p-5">
      <h1 className=" text-xl font-bold">Instructor Dashboard</h1>
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Student List Overview</h2>
        <table className="mt-4 border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">Active</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Jane Smith</td>
              <td className="border px-4 py-2">Completed</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Course Progress Tracker</h2>
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded-full">
            <div className="h-4 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="mt-2">75% of the course content is covered</p>
        </div>
      </section>
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Upcoming Classes Schedule</h2>
        <ul className="mt-4">
          <li>Math 101 - Dec 20, 2024</li>
          <li>Physics 202 - Dec 22, 2024</li>
        </ul>
      </section>
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <div className="mt-4">
          <p>Reminder: Final exam will be held on December 25th.</p>
        </div>
      </section>
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-4">
          <p>John Doe submitted Homework #3</p>
          <p>Jane Smith completed Quiz #2</p>
        </div>
      </section>
    </div>
  );
}

export default InstructorDash;

