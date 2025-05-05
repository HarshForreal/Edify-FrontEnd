import React, { useState, useEffect } from "react";
import StudentSidebar from "./StudentSidebar";
import enrollmentService from "../../services/enrollmentService";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui";
import { Button, Progress } from "../ui/index";

const StudentProgress = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoursesProgress = async () => {
    try {
      const data = await enrollmentService.getEnrolledCourses();

      const coursesWithProgress = await Promise.all(
        data.enrollments.map(async (enrollment) => {
          const course = enrollment.course;
          let progress = { progressPercentage: 0 };

          try {
            const progressData = await enrollmentService.getCourseProgress(
              course.id
            );
            progress = {
              progressPercentage: progressData?.progressPercentage || 0,
            };
          } catch (progressError) {
            console.warn(
              `Error fetching progress for course ${course.id}:`,
              progressError
            );
          }

          return {
            id: course.id,
            title: course.title,
            description: course.description,
            ...progress,
          };
        })
      );

      setCourses(coursesWithProgress);
    } catch (err) {
      console.log("Error fetching course progress.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesProgress();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-2">Student Progress</h1>
        <p className="text-gray-500 mb-6">
          Check your progress in each course.
        </p>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription>{course.description}</CardDescription>
                  <div className="mb-4">
                    <Progress
                      value={course.progressPercentage}
                      color="indigo"
                    />
                    <div className="text-right mt-2">
                      {course.progressPercentage}%
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div>No courses enrolled yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;
