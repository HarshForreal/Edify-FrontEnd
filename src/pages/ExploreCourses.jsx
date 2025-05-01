import { useEffect, useState } from "react";
import courseService from "@/services/courseService"; // Import courseService
import { Badge } from "../components/ui/index";
import ReactPlayer from "react-player";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/index";
import InstructorSidebar from "@/components/InstructorSidebar";
const ExploreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("explore");

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      console.log("Data from explore courses", data);
      setCourses(data.courses); // Set fetched courses to state
      setLoading(false);
    } catch (error) {
      console.log("Error fetching courses", error);
      setError("Failed to fetch courses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar can be the same as in the InstructorDashboard */}
      {/* <InstructorSidebar activePage="explore" setActivePage={() => {}} /> */}
      <InstructorSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-xl font-bold mb-1">Explore Courses</h2>
        <p className="text-gray-500 mb-4">Explore wide range of courses.</p>
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="shadow-lg rounded-lg overflow-hidden"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {course.title}
                  </CardTitle>
                  <Badge className="bg-orange-200 text-orange-800">
                    {course.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full pt-50 bg-gray-300 rounded-lg overflow-hidden">
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

                  <p className="text-gray-500">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;
