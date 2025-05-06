// src/services/enrollmentService.js
import api from "./axiosConfig";

const enrollmentService = {
  // Get enrolled courses
  getEnrolledCourses: async () => {
    try {
      const response = await api.get("/enroll/getListOfEnrollments");
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while fetching enrolled courses", error);
    }
  },

  // Enroll in a course
  getEnrolled: async (id) => {
    try {
      const response = await api.post("/enroll/enrollInCourse", {
        courseId: id,
      });
      console.log("Response from backend", response);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while enrolling in course", error);
    }
  },

  // Get course progress
  getCourseProgress: async (courseId) => {
    try {
      const response = await api.get(`/enroll/courseProgress/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course progress:", error);
      throw error;
    }
  },

  // Mark session as completed
  markSessionAsCompleted: async (sessionId, courseId) => {
    console.log("session id & course id", sessionId, courseId);
    try {
      const response = await api.post("/enroll/markSessionCompleted", {
        sessionId,
        courseId,
      });
      return response.data;
    } catch (error) {
      console.error("Error marking session as completed:", error);
      throw new Error("Error marking session as completed", error);
    }
  },
  toggleSessionCompletion: async (sessionId, isCompleted) => {
    try {
      const response = await api.patch(`/enroll/sessionProgress/${sessionId}`, {
        isCompleted,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling session completion:", error);
      throw error;
    }
  },
};

export default enrollmentService;
