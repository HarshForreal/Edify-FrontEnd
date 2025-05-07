import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from "../ui";
import courseService from "../../services/courseService";
import enrollmentService from "../../services/enrollmentService";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const StudentExplore = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEnrolledCourses = async () => {
    try {
      const data = await enrollmentService.getEnrolledCourses();
      const enrolledCourses = data.enrollments.map((enrollment) => ({
        courseId: enrollment.course.id,
        status: enrollment.status,
      }));
      console.log("Enrolled Courses", enrolledCourses);
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
      } else if (response.message === "You have already completed the course") {
        toast.info("You have already completed this course.");
      }
    } catch (err) {
      toast.error("Error enrolling in the course.");
      console.error(err);
    }
  };

  const getEnrollmentStatus = (courseId) => {
    const enrollment = myCourses.find((course) => course.courseId === courseId);
    return enrollment ? enrollment.status : null;
  };

  const getButtonText = (courseId) => {
    const status = getEnrollmentStatus(courseId);
    if (status === "enrolled") return "Enrolled";
    if (status === "completed") return "Completed";
    return "Enroll";
  };

  const isButtonDisabled = (courseId) => {
    return getEnrollmentStatus(courseId) !== null;
  };

  // Filtered Courses Logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get all available categories for filtering
  const getCategories = () => {
    const categories = [
      "All",
      ...new Set(courses.map((course) => course.category)),
    ];
    return categories;
  };

  useEffect(() => {
    fetchEnrolledCourses();
    displayCourses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto p-16">
        <h3 className="text-2xl font-semibold mb-4">Browse Courses</h3>

        {/* Search Bar */}
        <div className="mb-4">
          <label>Search: </label>
          <input
            type="text"
            placeholder="Search courses..."
            className="p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label>Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            {getCategories().map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {course.title}
                    </CardTitle>
                    {/* Display the course category */}
                    <Badge className="bg-orange-200 text-orange-800">
                      {course.category}
                    </Badge>
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
                    disabled={isButtonDisabled(course.id)}
                    onClick={() => enrollIntoCourse(course.id)}
                  >
                    {getButtonText(course.id)}
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
