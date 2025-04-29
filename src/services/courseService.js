// src/services/courseService.js
import api from "./axiosConfig";

const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get("/courses/");
      console.log("All courses", response.data.courses);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  },
};

export default courseService;
