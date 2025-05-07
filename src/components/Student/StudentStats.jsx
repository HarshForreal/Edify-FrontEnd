import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Button } from "../ui/button";
import enrollmentService from "../../services/enrollmentService";
const StudentStats = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [courseProgressData, setCourseProgressData] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const fetchCourseStats = async () => {
    try {
      const { enrollments } = await enrollmentService.getEnrolledCourses();
      const completed = enrollments.filter(
        (enrollment) => enrollment.status === "completed"
      ).length;

      const total = enrollments.length;

      const progressData = await Promise.all(
        enrollments.map(async (enrollment) => {
          const courseProgress = await enrollmentService.getCourseProgress(
            enrollment.course.id
          );
          return {
            courseId: enrollment.course.id,
            courseName: enrollment.course.name,
            completedSessions: courseProgress.completedSessions,
            totalSessions: courseProgress.totalSessions,
            progressPercentage: courseProgress.progressPercentage || 0,
          };
        })
      );

      setEnrolledCourses(enrollments);
      setCompletedCourses(completed);
      setTotalCourses(total);
      setCourseProgressData(progressData);
      setProgressPercentage((completed / total) * 100);
    } catch (error) {
      console.error("Error fetching course stats:", error);
    }
  };

  useEffect(() => {
    fetchCourseStats();
  }, []);

  // Pie chart data
  const data = [
    { name: "Completed", value: completedCourses },
    { name: "Remaining", value: totalCourses - completedCourses },
  ];

  // Bar chart data
  const barChartData = courseProgressData.map((data) => ({
    name: data.courseName,
    completed: data.completedSessions,
    total: data.totalSessions,
    progress: data.progressPercentage,
  }));

  return (
    <div className="p-8">
      {/* Course Progress Summary */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Course Progress Statistics</h2>
        <div className="text-sm text-gray-600 bg-gray-200 rounded-md p-2 w-1/3">
          <strong>
            {completedCourses} of {totalCourses} courses completed (
            {Math.round(progressPercentage)}%)
          </strong>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-8 flex justify-center items-center w-full">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              <Cell fill="#82ca9d" />
              <Cell fill="#d2d2d2" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Individual Course Progress
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="progress"
              fill="#82ca9d"
              background={{ fill: "#eeeeee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Button variant="outline" onClick={() => window.history.back()}>
        Back to Courses
      </Button>
    </div>
  );
};

export default StudentStats;
