import { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription, CardHeader } from "../components/ui";
import { Button } from "../components/ui/button";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs,
} from "../components/ui/tabs";
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
import enrollmentService from "../services/enrollmentService";
import { useAuth } from "@/context/AuthContext"; // Import useAuth to access logout
import DisplaySessions from "@/components/DisplaySessions";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("my-courses");
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  // Access logout function from AuthContext
  const { logout } = useAuth();

  // Fetch Course List - discover tab
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

  // Enroll into Course with toast notifications
  const enrollIntoCourse = async (id) => {
    try {
      const response = await enrollmentService.getEnrolled(id);
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

  // Get Sessions
  const getSessions = (courseId) => {
    setSelectedCourseId(courseId);
    setShowSessions(true);
  };

  // Handle Logout using the logout function from AuthContext
  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  // UseEffect to load courses based on active tab
  useEffect(() => {
    if (activeTab === "my-courses") {
      fetchEnrolledCourses();
    } else if (activeTab === "discover") {
      displayCourses();
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
            onClick={handleLogout} // Using the handleLogout method
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-500 mb-6">
            Welcome back! Continue learning or discover new courses.
          </p>
          {showSessions ? (
            <DisplaySessions
              courseId={selectedCourseId}
              onBack={() => setShowSessions(false)} // Go back to courses list
            />
          ) : (
            <div>
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
                          <CardDescription>
                            {course.description}
                          </CardDescription>
                          <Button
                            onClick={() => getSessions(course.id)}
                            className="mt-4"
                          >
                            Continue
                          </Button>
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
                            <CardDescription>
                              {course.description}
                            </CardDescription>
                            <Button
                              onClick={() => enrollIntoCourse(course.id)}
                              disabled={myCourses.some(
                                (myCourse) => myCourse.id === course.id
                              )}
                              className="mt-4"
                            >
                              {myCourses.some(
                                (myCourse) => myCourse.id === course.id
                              )
                                ? "Enrolled"
                                : "Enroll"}
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
          )}
        </div>
      </div>
    </div>
  );
}
