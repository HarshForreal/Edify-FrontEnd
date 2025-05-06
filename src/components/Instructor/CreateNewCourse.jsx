import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import courseService from "@/services/courseService"; // Import courseService
import CreateNewSession from "./CreateNewSession"; // Import the CreateNewSession form component
import { useNavigate } from "react-router-dom";
function CreateNewCourse({ onCancel }) {
  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Languages",
  ];
  // const [showNewCourse, setShowNewCourse] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
  }); // State for form data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddSessionForm, setShowAddSessionForm] = useState(false); // State to toggle session form visibility
  const navigate = useNavigate();
  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await courseService.createCourse(formData);
      console.log("Course created successfully:", response.message);
      console.log("Course Data Being Sent:", formData);
      const newCourseId = response.course.id;
      navigate(`/instructor-dashboard/courses/${newCourseId}`);

      setShowAddSessionForm(true);
    } catch (err) {
      setError("Error creating course. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false once API call completes
    }
  };
  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const submitForm = () => {
    handleCreateCourse();
  };

  return (
    <>
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Create New Course</h1>
        <p className="text-gray-500 mt-1">
          Add a new course to your portfolio.
        </p>
      </div>

      {/* Form */}
      <div className="px-6">
        {showAddSessionForm ? (
          <div>
            <CreateNewSession onCancel={onCancel} />
          </div>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleCreateCourse}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1">Course Details</h2>
                  <p className="text-gray-500 mb-6">
                    Provide the basic information about your course.
                  </p>

                  {/* Course Title */}
                  <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 font-medium">
                      Course Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Introduction to JavaScript"
                      className="max-w-2xl"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Course Description */}
                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block mb-2 font-medium"
                    >
                      Course Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what students will learn in this course..."
                      className="min-h-32 max-w-2xl"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <label
                      htmlFor="category"
                      className="block mb-2 font-medium"
                    >
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="max-w-2xl">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Video URL */}
                  <div className="mb-6">
                    <label
                      htmlFor="videoUrl"
                      className="block mb-2 font-medium"
                    >
                      YouTube Video URL
                    </label>
                    <Input
                      id="videoUrl"
                      name="videoUrl"
                      placeholder="e.g., https://www.youtube.com/watch?v=kPL-6-9MVyA"
                      className="max-w-2xl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={submitForm}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Creating..." : "Create Course"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default CreateNewCourse;
