import api from "./axiosConfig";
const addReview = async (courseId, rating, comment) => {
  try {
    const response = await api.post(
      `/reviews/${courseId}/reviews`,
      {
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is in local storage
        },
      }
    );
    console.log("Add Review Service", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw new Error(
      error.response ? error.response.data.message : "Error adding review"
    );
  }
};

const getReviews = async (courseId) => {
  try {
    const response = await api.get(`/reviews/${courseId}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Get Reviews Service", getReviews);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error(
      error.response ? error.response.data.message : "Error fetching reviews"
    );
  }
};

export default {
  addReview,
  getReviews,
};
