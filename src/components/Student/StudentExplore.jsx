import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardDescription } from "../ui";
import courseService from "../../services/courseService";
import enrollmentService from "../../services/enrollmentService";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const StudentExplore = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myCourses, setMyCourses] = useState([]);

  const fetchEnrolledCourses = async () => {
    try {
      const data = await enrollmentService.getEnrolledCourses();
      const enrolledCourses = data.enrollments.map(
        (enrollment) => enrollment.course.id
      );
      setMyCourses(enrolledCourses);
    } catch (err) {
      console.log("Error fetching enrolled courses.", err);
    }
  };

  const displayCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses();
      setCourses(data.courses);
      setLoading(false);
    } catch (err) {
      console.log("Error while fetching courses", err);
      setLoading(false);
    }
  };

  const enrollIntoCourse = async (courseId) => {
    try {
      const response = await enrollmentService.getEnrolled(courseId);
      if (response.message === "You are already enrolled in the course") {
        toast.error("You are already enrolled in this course.");
      } else if (response.message === "Successfully enrolled in the course") {
        toast.success("You have successfully enrolled in the course!");
        fetchEnrolledCourses();
      }
    } catch (err) {
      toast.error("Error enrolling in the course.", err);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
    displayCourses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto p-8">
        <h3 className="text-2xl font-semibold mb-4">Browse Courses</h3>
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
                    className="mt-4"
                    disabled={myCourses.includes(course.id)} // Disable if already enrolled
                    onClick={() => enrollIntoCourse(course.id)}
                  >
                    {myCourses.includes(course.id) ? "Enrolled" : "Enroll"}
                  </Button>
                </Card>
              ))
            ) : (
              <div>No courses available at the moment.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExplore;
