// src/pages/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get courseId from the URL
import { Card } from "../components/ui";
import axios from "axios";

const CourseDetails = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`
        );
        setCourse(response.data); // Set the course details
      } catch (error) {
        console.log("Error fetching course details", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="mt-4">
      {course ? (
        <Card className="p-6 bg-white rounded-xl">
          <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
          <p>{course.description}</p>
          {/* You can display more details here */}
        </Card>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetails;
