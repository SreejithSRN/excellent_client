import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { commonRequest } from "../../common/api";
import { config } from "../../common/config";

type StudentStats = {
  totalPurchasedCourses: number;
  totalInstructors: number;
  paidCourses: number;
  freeCourses: number;
  totalAssessments: number;
  completedAssessments: number;
  pendingAssessments: number;
  recentPurchases: {
    courseTitle: string;
    instructorName: string;
    purchaseDate: string;
  }[];
  monthlyPurchases: {
    month: string;
    count: number;
  }[];
};

function StudentDash() {
  const [stats, setStats] = useState<StudentStats>({
    totalPurchasedCourses: 0,
    totalInstructors: 0,
    paidCourses: 0,
    freeCourses: 0,
    totalAssessments: 0,
    completedAssessments: 0,
    pendingAssessments: 0,
    recentPurchases: [],
    monthlyPurchases: [],
  });

  useEffect(() => {
    const fetchStudentStats = async () => {
      try {
        const res = await commonRequest<StudentStats>(
          "GET",
          `/api/course/studentdashboardSummary`,
          config
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching student dashboard data:", err);
      }
    };

    fetchStudentStats();
  }, []);

  const barColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#a4de6c",
    "#d0ed57",
  ];

  const summaryTop = [
    { title: "Courses Purchased", value: stats.totalPurchasedCourses },
    { title: "Total Instructors", value: stats.totalInstructors },
    { title: "Paid Courses", value: stats.paidCourses },
    { title: "Free Courses", value: stats.freeCourses },
  ];

  const summaryAssessment = [
    { title: "Total Assessments", value: stats.totalAssessments },
    { title: "Completed", value: stats.completedAssessments },
    { title: "Pending", value: stats.pendingAssessments },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Student Dashboard
      </h1>

      {/* Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        {summaryTop.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2 text-blue-600">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Assessment Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {summaryAssessment.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                stat.title === "Pending" || stat.title === "Pending Assessments"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Purchases */}
<div className="bg-white shadow rounded-xl p-6 mb-10">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">
    Last 5 Purchased Courses
  </h3>
  <div className="w-full overflow-x-auto">
    <div className="min-w-[600px]">
      {/* Header Row */}
      <div className="grid grid-cols-3 gap-4 text-gray-500 text-sm font-semibold border-b pb-2 mb-2">
        <span>Course Title</span>
        <span>Instructor</span>
        <span>Purchase Date</span>
      </div>

      {/* Purchase Rows */}
      {stats.recentPurchases.map((course, i) => {
        const bgColors = ["bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-purple-50", "bg-pink-50"];
        const rowColor = bgColors[i % bgColors.length];

        return (
          <div
            key={i}
            className={`grid grid-cols-3 gap-4 rounded-lg p-4 mb-2 ${rowColor} shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            <span className="font-medium text-gray-800">{course.courseTitle}</span>
            <span className="text-gray-700">{course.instructorName}</span>
            <span className="text-gray-600">
              {new Date(course.purchaseDate).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</div>


      {/* Purchase History Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Course Purchase History
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyPurchases}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
  {stats.monthlyPurchases.map((entry, index) => {
    const color = entry.count > 5 ? "#4caf50" : barColors[index % barColors.length];
    return <Cell key={`cell-${index}`} fill={color} />;
  })}
</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StudentDash;
