import React, { useState } from "react";
import { Button } from "./ui/index";
import sessionService from "../services/sessionService"; // Import session service
import { useNavigate } from "react-router-dom"; // To navigate back to the course details page
import TipTapEditor from "./Editor/TipTapEditor"; // Import the Tiptap editor
const CreateNewSession = ({ courseId, onCancel }) => {
  const [content, setContent] = useState(""); // Content will be stored as HTML
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading state

    try {
      const sessionData = {
        title,
        description: content, // Store HTML content directly
        videoUrl,
        courseId, // Passing the courseId tso associate the session with the course
      };
      // Call the API to create a session
      const response = await sessionService.createSession(sessionData);
      console.log("Session created successfully:", response);
      navigate(`/instructor-dashboard`);
    } catch (err) {
      setError("Error creating session. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Add Session</h1>
      <p className="text-gray-600 mb-6">
        Create a new learning session for your course.
      </p>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-2">Session Details</h2>
        <p className="text-gray-600 mb-6">
          Provide the content for this learning session.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Session Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="sessionTitle">
              Session Title
            </label>
            <input
              type="text"
              id="sessionTitle"
              name="title"
              placeholder="e.g., Introduction to Variables"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* YouTube Video URL */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="youtubeUrl">
              YouTube Video URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              name="youtubeUrl"
              placeholder="e.g., https://www.youtube.com/watch?v=..."
              className="w-full p-2 border rounded"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <p className="text-gray-600 text-sm mt-1">
              Provide a YouTube video URL for this session (optional).
            </p>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="sessionContent"
            >
              Session Description
            </label>
            <div className="rounded">
              <TipTapEditor
                value={content}
                onChange={(updatedContent) => setContent(updatedContent)}
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Session"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewSession;
