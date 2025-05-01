import api from "./axiosConfig";

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*?[?&]v=))([^"&?\\/\s]*))/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to get the thumbnail URL
const getThumbnailUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`; // YouTube thumbnail URL
  }
  return "/path/to/default-thumbnail.jpg"; // we need to add the default thumbnail.
};

const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get("/courses/");
      const courses = response.data.courses;
      console.log("Fetched Courses", courses);
      // Add thumbnail URL to each course
      courses.forEach((course) => {
        if (course.videoUrl) {
          course.thumbnailUrl = getThumbnailUrl(course.videoUrl);
        }
      });

      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  },
  getInstructorCourses: async () => {
    try {
      const response = await api.get("/courses/getInstructorCourses");
      const courses = response.data.courses;
      courses.forEach((course) => {
        if (course.videoUrl) {
          course.thumbnailUrl = getThumbnailUrl(course.videoUrl);
        }
      });

      return response.data.courses;
    } catch (error) {
      console.log("Error", error);
    }
  },
  createCourse: async (courseData) => {
    try {
      const response = await api.post("/courses/create", courseData);
      return response.data;
    } catch (error) {
      throw new Error("Error while creating the course", error);
    }
  },
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error occured", error);
    }
  },
};

export default courseService;
