import React, { useState, useEffect } from "react";
import enrollmentService from "../services/enrollmentService";
import ReactPlayer from "react-player";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "../components/ui/index";
import DisplaySessionsProgress from "@/components/Student/DisplaySessionsProgress";

const StudentDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showSessions, setShowSessions] = useState(false);

  const fetchEnrolledCourses = async () => {
    try {
      const data = await enrollmentService.getEnrolledCourses();
      const enrolledCourses = data.enrollments.map((enrollment) => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        category: enrollment.course.category,
        videoUrl: enrollment.course.videoUrl,
      }));
      setMyCourses(enrolledCourses);
    } catch (err) {
      console.log("Error fetching enrolled courses.", err);
    }
  };

  const getSessions = (courseId) => {
    setSelectedCourseId(courseId);
    setShowSessions(true);
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Welcome back! Continue learning or discover new courses.
        </p>

        {/* Render Content Based on Active Section */}
        {showSessions ? (
          <DisplaySessionsProgress
            courseId={selectedCourseId}
            onBack={() => setShowSessions(false)} // Go back to courses list
          />
        ) : (
          <div>
            <h3 className="text-2xl font-semibold mb-4">My Courses</h3>
            {myCourses.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {myCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        {course.title}
                      </CardTitle>
                    </CardHeader>
                    <div className="relative w-full pt-[56.25%] bg-gray-300 rounded-lg overflow-hidden mb-4">
                      <ReactPlayer
                        url={course.videoUrl}
                        light={course.thumbnailUrl}
                        playing={false}
                        width="100%"
                        height="100%"
                        controls={true}
                        className="absolute top-0 left-0"
                      />
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                    <Button
                      onClick={() => getSessions(course.id)} // On click, fetch the sessions
                      className="mt-4"
                    >
                      Continue
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div>You are not enrolled in any courses.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
