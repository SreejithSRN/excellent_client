import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { commonRequest } from "../../common/api";
import { config } from "../../common/config";

type CourseStats = {
  totalCourses: number;
  totalStudents: number;
  totalAssessments: number;
  studentPerCourse: { courseTitle: string; studentCount: number }[];
  recentCourses: { title: string; updatedAt: string }[];
};

type PaymentStats = {
  totalRevenue: number;
  totalPurchases: number;
};

function InstructorDash() {
  const [courseData, setCourseData] = useState<CourseStats>({
    totalCourses: 0,
    totalStudents: 0,
    totalAssessments: 0,
    studentPerCourse: [],
    recentCourses: [],
  });

  const [paymentData, setPaymentData] = useState<PaymentStats>({
    totalRevenue: 0,
    totalPurchases: 0,
  });

  useEffect(() => {
    const fetchCourseStats = async () => {
      try {
        const res = await commonRequest<CourseStats>(
          "GET",
          `/api/course/instructorDashboardSummary`,
          config
        );
        setCourseData(res.data);
      } catch (err) {
        console.error("Error fetching course stats:", err);
      }
    };

    const fetchPaymentStats = async () => {
      try {
        const res = await commonRequest<PaymentStats>(
          "GET",
          `/api/payment/instructorStatsSummary`,
          config
        );
        setPaymentData(res.data);
      } catch (err) {
        console.error("Error fetching payment stats:", err);
      }
    };

    fetchCourseStats();
    fetchPaymentStats();
  }, []);

  const barColors = [
    "#8884d8", // Purple
    "#82ca9d", // Green
    "#ffc658", // Yellow
    "#ff7f50", // Coral
    "#a4de6c", // Light green
    "#d0ed57", // Lime
    "#8dd1e1", // Light blue
    "#83a6ed", // Blue
  ];
  

  const summaryTop = [
    { title: "Total Courses", value: courseData.totalCourses },
    { title: "Total Students", value: courseData.totalStudents },
    { title: "Assessments", value: courseData.totalAssessments },
  ];

  const summaryRevenue = [
    {
      title: "Total Revenue",
      value: `₹${paymentData.totalRevenue.toLocaleString()}`,
    },
    { title: "Total Paid Purchases", value: paymentData.totalPurchases },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Instructor Dashboard
      </h1>

      {/* Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {summaryTop.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2 text-blue-600">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue & Purchases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {summaryRevenue.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-600 text-sm font-medium">{stat.title}</h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                stat.title === "Total Revenue"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Students Per Course Graph */}
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Students Enrolled Per Course
        </h3>
        <ResponsiveContainer width="100%" height={300}>
  <BarChart data={courseData.studentPerCourse}>
    <XAxis dataKey="courseTitle" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="studentCount">
      {courseData.studentPerCourse.map((_, index) => (
        <Cell
          key={`cell-${index}`}
          fill={barColors[index % barColors.length]}
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

      </div>

      {/* Last 5 Updated Courses */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Last 5 Updated Courses
        </h3>
        <ul className="space-y-3">
          {courseData.recentCourses.map((course, i) => {
            const bgColors = [
              "bg-blue-50",
              "bg-green-50",
              "bg-yellow-50",
              "bg-purple-50",
              "bg-pink-50",
            ];
            const textColors = [
              "text-blue-800",
              "text-green-800",
              "text-yellow-800",
              "text-purple-800",
              "text-pink-800",
            ];
            const bg = bgColors[i % bgColors.length];
            const text = textColors[i % textColors.length];

            return (
              <li
                key={i}
                className={`${bg} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <p className={`text-lg font-semibold ${text}`}>
                  {course.title}
                </p>
                <p className="text-sm text-gray-600">
                  Updated on{" "}
                  <span className="font-medium">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default InstructorDash;
