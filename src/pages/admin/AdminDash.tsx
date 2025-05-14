import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { commonRequest } from "../../common/api";
import { config } from "../../common/config";

type CourseDashboardData = {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalCategories: number;
  monthlySignups: { month: string; students: number }[];
  courseCategories: { name: string; value: number }[];
};

type PaymentSummaryData = {
  totalRevenue: number;
  totalProfit: number;
};

const COLORS = [
  "#8884d8", // Soft purple
  "#82ca9d", // Soft green
  "#ffc658", // Amber
  "#ff8042", // Orange
  "#00C49F", // Teal
  "#0088FE", // Blue
  "#FFBB28", // Yellow
  "#FF4444", // Red
  "#A28FD0", // Lavender
  "#66CC99", // Mint
  "#F96E46", // Coral
  "#3366CC", // Deep blue
];

function AdminDash() {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    categories: 0,
    totalRevenue: 0,
    totalProfit: 0,
  });
  const [monthlySignups, setMonthlySignups] = useState<
    { month: string; students: number }[]
  >([]);
  const [courseCategories, setCourseCategories] = useState<
    { name: string; value: number }[]
  >([]);

  const summaryStats = [
    { title: "Total Students", value: summary.totalStudents },
    { title: "Total Instructors", value: summary.totalInstructors },
    { title: "Total Courses", value: summary.totalCourses },
    { title: "Categories", value: summary.categories },
    {
      title: "Total Revenue",
      value: `₹${summary.totalRevenue.toLocaleString()}`,
    },
    {
      title: "Total Profit",
      value: `₹${summary.totalProfit.toLocaleString()}`,
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Course service call
        const courseRes = await commonRequest<CourseDashboardData>(
          "GET",
          `/api/course/adminDashboardSummary`,
          config
        );

        const courseData = courseRes.data;
        setSummary((prev) => ({
          ...prev,
          totalStudents: courseData.totalStudents,
          totalInstructors: courseData.totalInstructors,
          totalCourses: courseData.totalCourses,
          categories: courseData.totalCategories,
        }));
        setMonthlySignups(courseData.monthlySignups);
        setCourseCategories(courseData.courseCategories);

        // Payment service call
        const paymentRes = await commonRequest<PaymentSummaryData>(
          "GET",
          `/api/payment/summary`,
          config
        );

        const paymentData = paymentRes.data;
        setSummary((prev) => ({
          ...prev,
          totalRevenue: paymentData.totalRevenue,
          totalProfit: paymentData.totalProfit,
        }));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                stat.title === "Total Revenue"
                  ? "text-red-600"
                  : stat.title === "Total Profit"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Monthly Signups */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Student Signups
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlySignups}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Categories */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Course Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={courseCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {courseCategories.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;

// {courseCategories.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
