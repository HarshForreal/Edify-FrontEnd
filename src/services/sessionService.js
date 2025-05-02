// src/services/courseService.js
import api from "./axiosConfig";

const sessionService = {
  getCourseSession: async (id) => {
    try {
      const response = await api.get(`/sessions/getSessionsByCourse/${id}`);
      return response.data.sessions;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return {
          sessions: [],
          message: "No sessions found for this course",
        };
      }
      throw new Error("An Error occured while fetching the course");
    }
  },
  createSession: async (sessionData) => {
    try {
      const response = await api.post("/sessions/createSession", sessionData); // POST request to create session
      return response.data;
    } catch (error) {
      console.error("Error while creating session", error);
      throw error;
    }
  },
  deleteSession: async (id) => {
    try {
      const response = await api.delete(`/sessions/deleteSession/${id}`);
      if (response.status === 200) {
        console.log("Response Message", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error while deleting session", error);
    }
  },
};

export default sessionService;
