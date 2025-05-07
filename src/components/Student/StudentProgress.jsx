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
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-4 md:p-8 lg:p-12">
        <div className="mt-12 md:mt-2">
          <h1 className="text-3xl font-bold mb-2">Student Progress</h1>
          <p className="text-gray-500 mb-6">
            Check your progress in each course.
          </p>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-white shadow rounded-lg overflow-hidden"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <div className="px-6 pb-4">
                      <Progress
                        value={course.progressPercentage}
                        className="h-2 mb-1"
                      />
                      <div className="text-right mt-1 text-sm font-medium">
                        {course.progressPercentage}%
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No courses enrolled yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
