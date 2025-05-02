import { useEffect, useState } from "react";
import CreateNewCourse from "../components/CreateNewCourse";
import { Origami, MoveRight, Plus, Trash, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "../components/ui/index";
import { Button } from "../components/ui/button";
import courseService from "@/services/courseService";
import ReactPlayer from "react-player";
import InstructorSidebar from "@/components/InstructorSidebar";
import ExploreCourses from "./ExploreCourses";
import { useNavigate } from "react-router-dom";
export default function InstructorDashboard() {
  const [activePage, setActivePage] = useState("courses"); // Default to "courses"
  const [courses, setCourses] = useState([]);
  const [showNewCourse, setShowNewCourse] = useState(false);

  // Get courses function
  const navigate = useNavigate();
  const getInstructorCourses = async () => {
    try {
      const response = await courseService.getInstructorCourses();
      setCourses(response);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const viewSessions = (id) => {
    navigate(`/instructor-dashboard/courses/${id}`);
  };

  const deleteCourse = async (id) => {
    console.log("Deleting course with id:", id);
    try {
      const response = await courseService.deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
      console.log(response);
    } catch (error) {
      console.log("Error while deleting", error);
    }
  };

  useEffect(() => {
    if (activePage === "courses") {
      getInstructorCourses();
    }
  }, [activePage]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Pass activePage and setActivePage to InstructorSidebar */}
      <InstructorSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {activePage === "explore" ? (
          <ExploreCourses />
        ) : (
          <>
            {showNewCourse ? (
              <CreateNewCourse onCancel={() => setShowNewCourse(false)} />
            ) : (
              <>
                <div className="p-6 flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => setShowNewCourse(true)}
                  >
                    <Plus size={18} />
                    <span>New Course</span>
                  </Button>
                </div>

                <div className="px-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-1">My Courses</h2>
                    <p className="text-gray-500 mb-4">
                      Manage your existing courses or create new ones.
                    </p>

                    {courses.length > 0 ? (
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
                              <p className="text-gray-500">
                                {course.description}
                              </p>
                              <div className="">
                                <Button
                                  variant="destructive"
                                  className="mt-4 mr-2 group"
                                  onClick={() => deleteCourse(course.id)}
                                >
                                  <Trash
                                    size={16}
                                    className="mr-2 transition-transform duration-300 group-hover:-translate-y-1"
                                  />
                                  Trash
                                </Button>
                                <Button
                                  onClick={() => viewSessions(course.id)}
                                  className="mt-4 group"
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                  View Sessions
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <h3 className="text-lg font-semibold mb-2">
                            No courses yet
                          </h3>
                          <p className="text-gray-500">
                            You haven't created any courses yet. Click the "New
                            Course" button to get started.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
