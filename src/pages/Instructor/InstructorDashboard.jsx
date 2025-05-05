import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Plus, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Badge,
} from "../../components/ui/index";
import { Button } from "../../components/ui/button";
import ReactPlayer from "react-player";
import CreateNewCourse from "../../components/Instructor/CreateNewCourse";
import ExploreCourses from "../../components/Instructor/InstructorExplore";
import courseService from "@/services/courseService";
import AlertModal from "../../components/Instructor/AlertModal";
import InstructorExplore from "../../components/Instructor/InstructorExplore";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [courseToDelete, setCourseToDelete] = useState(null); // Track course to delete
  const navigate = useNavigate();

  // Fetch courses function
  const getInstructorCourses = async () => {
    try {
      const response = await courseService.getInstructorCourses();
      if (Array.isArray(response)) {
        // just to ensure that the response is array
        setCourses(response);
      } else {
        console.log("Invalid response format", response);
      }
    } catch (error) {
      console.log("Error fetching courses", error);
    }
  };

  const viewSessions = (id) => {
    navigate(`/instructor-dashboard/courses/${id}`);
  };

  const deleteCourse = async (id) => {
    try {
      await courseService.deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error deleting course", error);
    }
  };

  const handleShowModal = (course) => {
    setCourseToDelete(course); // Set the course to be deleted
    setIsModalOpen(true); // Open the modal
  };

  useEffect(() => {
    getInstructorCourses();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto p-6">
        {showNewCourse === "explore" ? (
          <InstructorExplore />
        ) : (
          <>
            {showNewCourse ? (
              <CreateNewCourse onCancel={() => setShowNewCourse(false)} />
            ) : (
              <div>
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
                              <p className="text-gray-500">
                                {course.description}
                              </p>
                              <div className="mt-4">
                                <Button
                                  variant="destructive"
                                  className="mr-2 group"
                                  onClick={() => handleShowModal(course)}
                                >
                                  <Trash
                                    size={16}
                                    className="mr-2 transition-transform duration-300 group-hover:-translate-y-1"
                                  />
                                  Trash
                                </Button>
                                <Button
                                  onClick={() => viewSessions(course.id)}
                                  className="group"
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
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for course deletion */}
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteCourse(courseToDelete.id)}
        courseName={courseToDelete?.title || ""}
      />
    </div>
  );
}
