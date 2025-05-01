import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { Card, CardContent, CardHeader, CardTitle } from "./ui";
import ReactPlayer from "react-player";
import enrollmentService from "../services/enrollmentService";
import sessionService from "../services/sessionService";

export default function DisplaySessions({ courseId, onBack }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courseProgress, setCourseProgress] = useState({
    totalSessions: 0,
    completedSessions: 0,
    progressPercentage: 0,
  });

  // Fetch sessions and user progress
  const fetchSessionsAndProgress = async () => {
    try {
      setLoading(true);

      // Fetch all sessions for the course
      const sessionData = await sessionService.getCourseSession(courseId);
      console.log("Session Data", sessionData);

      // Fetch the user's progress for the course
      const progressData = await enrollmentService.getCourseProgress(courseId);
      console.log("Progress Data Log", progressData);

      // Extract progress metrics
      const {
        totalSessions,
        completedSessions,
        progressPercentage,
        sessions: progressSessions = [],
      } = progressData || {};

      // Update course progress state
      setCourseProgress({
        totalSessions: totalSessions || 0,
        completedSessions: completedSessions || 0,
        progressPercentage: progressPercentage || 0,
      });

      // Debugging the progressSessions to see its structure
      console.log("Progress Sessions:", progressSessions);

      // Combine session data with progress data
      const sessionsWithProgress = sessionData.map((session) => {
        console.log("Checking session:", session);

        // Find the progress for the session from progressSessions
        const sessionProgress = progressSessions.find(
          (p) => p.id === session.id
        );
        console.log("Session Progress:", sessionProgress);

        return {
          ...session,
          isCompleted: sessionProgress ? sessionProgress.isCompleted : false,
        };
      });

      setSessions(sessionsWithProgress);
      setLoading(false);
    } catch (err) {
      setError("Error fetching sessions and progress.");
      setLoading(false);
      console.error("Error in fetchSessionsAndProgress:", err);
    }
  };

  useEffect(() => {
    fetchSessionsAndProgress();
  }, [courseId]);

  const handleMarkDone = async (sessionId) => {
    try {
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, isProcessing: true } // Show processing state
            : session
        )
      );

      // Call the API to mark the session as completed
      await enrollmentService.markSessionAsCompleted(sessionId, courseId);

      // Immediately update the session status in frontend state
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, isCompleted: true, isProcessing: false } // Update status to completed
            : session
        )
      );

      // Re-fetch updated session data and progress
      await fetchSessionsAndProgress();
    } catch (err) {
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, isProcessing: false } // Remove processing state if error occurs
            : session
        )
      );
      console.error("Error marking session as completed:", err);
      setError("Failed to mark session as completed. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="p-8">
      <Button onClick={onBack} variant="outline" className="mb-4">
        Back to Courses
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mt-4">Course Progress</h2>
        <div className="mt-2 bg-gray-200 rounded-full h-4 w-full">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${courseProgress.progressPercentage || 0}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {courseProgress.completedSessions} of {courseProgress.totalSessions}{" "}
          sessions completed (
          {Math.round(courseProgress.progressPercentage || 0)}%)
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-4">Sessions</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <Card
                key={session.id}
                className={`shadow-md hover:shadow-lg transition-all ${
                  session.isCompleted ? "border-green-200 bg-green-50" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">{session.description}</p>
                  <div className="relative w-full pt-[56.25%] bg-gray-300 rounded-lg overflow-hidden mb-4">
                    <ReactPlayer
                      url={session.videoUrl}
                      light={session.thumbnailUrl}
                      playing={false}
                      width="100%"
                      height="100%"
                      controls={true}
                      className="absolute top-0 left-0"
                    />
                  </div>

                  <Button
                    onClick={() =>
                      !session.isCompleted && handleMarkDone(session.id)
                    }
                    className={`mt-4 w-full ${
                      session.isCompleted
                        ? "bg-green-500 hover:bg-green-500"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={session.isCompleted || session.isProcessing}
                  >
                    {session.isProcessing ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                        Processing...
                      </span>
                    ) : session.isCompleted ? (
                      "✓ Completed"
                    ) : (
                      "Mark as Done"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center p-8 bg-gray-50 rounded-lg">
              No sessions available for this course.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
