function AdminDash() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">User Statistics</h2>
          <p className="text-gray-600 mt-2">Active Users: 1234</p>
          <p className="text-gray-600">New Users: 45</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
          <p className="text-gray-600 mt-2">Total Sales: $12,345</p>
          <p className="text-gray-600">Revenue: $8,900</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">System Alerts</h2>
          <p className="text-gray-600 mt-2">3 new alerts</p>
          <p className="text-gray-600">Last alert: 2 hours ago</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Task Progress</h2>
          <p className="text-gray-600 mt-2">Completed Tasks: 8/10</p>
          <p className="text-gray-600">Pending: 2</p>
        </div>

        {/* Card 5 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Performance</h2>
          <p className="text-gray-600 mt-2">CPU Usage: 65%</p>
          <p className="text-gray-600">Memory Usage: 70%</p>
        </div>

        {/* Card 6 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
          <p className="text-gray-600 mt-2">Unread Messages: 5</p>
          <p className="text-gray-600">Pending Approvals: 3</p>
        </div>

        {/* Card 7 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Activity Log</h2>
          <p className="text-gray-600 mt-2">Last Login: 2 hours ago</p>
          <p className="text-gray-600">Recent Activity: File Upload</p>
        </div>

        {/* Card 8 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Upcoming Events</h2>
          <p className="text-gray-600 mt-2">Team Meeting: Dec 20</p>
          <p className="text-gray-600">Deadline: Project Submission Dec 22</p>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
        <p className="text-gray-600 mt-2">This is a quick summary of the key metrics and activities in your dashboard.</p>
      </div>
    </div>
  );
}

export default AdminDash;



