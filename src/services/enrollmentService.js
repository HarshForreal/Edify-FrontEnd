// src/services/courseService.js
import api from "./axiosConfig";

const enrollmentService = {
  getEnrolledCourses: async () => {
    try {
      const response = await api.get("/enroll/getListOfEnrollments");
      console.log("Response", response);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      throw new Error("Some error occured", error);
    }
  },
  getEnrolled: async (id) => {
    try {
      const response = await api.post("/enroll/enrollInCourse", {
        courseId: id,
      });
      return response.data;
    } catch (error) {
      throw new error();
    }
  },
};

export default enrollmentService;
