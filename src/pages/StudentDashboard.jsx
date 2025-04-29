import { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription } from "../components/ui";
import { Button, Alert, AlertDescription } from "../components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui";
import {
  BookOpen,
  FolderOpen,
  Home,
  Settings,
  LogOut,
  Origami,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/courseService";
import enrollmentService from "../services/enrollmentService"; // Import the service for enrolling
import authService from "../services/authService";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("my-courses");
  const [courses, setCourses] = useState([]); // State to store available courses
  const [myCourses, setMyCourses] = useState([]); // State to store enrolled courses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Course List - discover tab
  const displayCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses();
      setCourses(data.courses);
      setLoading(false);
    } catch (err) {
      setError("Error fetching courses.", err);
      setLoading(false);
    }
  };

  // Fetch Enrolled Courses - my courses tab
  const fetchEnrolledCourses = async () => {
    try {
      const data = await enrollmentService.getEnrolledCourses();
      // Map the response to extract the course details
      const enrolledCourses = data.enrollments.map((enrollment) => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        category: enrollment.course.category,
        videoUrl: enrollment.course.videoUrl,
      }));
      setMyCourses(enrolledCourses);
    } catch (err) {
      setError("Error fetching enrolled courses.", err);
    }
  };

  // Enroll into Course
  const enrollIntoCourse = async (id) => {
    console.log("Enrolling into the course of id: ", id);
    try {
      const response = await enrollmentService.getEnrolled(id); // Enroll in the course
      if (response.message === "Successfully enrolled in the course") {
        // Fetch the updated list of enrolled courses
        fetchEnrolledCourses();
      }
    } catch (err) {
      console.log("Error while enrolling:", err);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    console.log("Logging out the user");
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  useEffect(() => {
    if (activeTab === "discover") {
      displayCourses();
    } else if (activeTab === "my-courses") {
      fetchEnrolledCourses();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Origami className="text-black" />
            <span className="text-xl font-bold text-black">Edify</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start bg-gray-100">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={displayCourses}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="justify-start hover:text-white hover:bg-red-500"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-500 mb-6">
          Welcome back! Continue learning or discover new courses.
        </p>

        <Tabs
          defaultValue="my-courses"
          className="mb-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="my-courses" className="mt-4">
            {myCourses.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {myCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                    <Button>Continue</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div>You are not enrolled in any course.</div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="mt-4">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <Card
                      key={course.id}
                      className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                      <Button onClick={() => enrollIntoCourse(course.id)}>
                        Enroll
                      </Button>
                    </Card>
                  ))
                ) : (
                  <div>No courses available at the moment.</div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
