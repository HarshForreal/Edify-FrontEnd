import React, { useEffect, useState } from "react";
import RatingModal from "./RatingModal"; // Import the RatingModal
import { Button } from "../ui";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";
import ReactPlayer from "react-player";
import enrollmentService from "../../services/enrollmentService";
import sessionService from "../../services/sessionService";
import reviewService from "../../services/reviewService.js";

export default function DisplaySessionsProgress({ courseId, onBack }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courseProgress, setCourseProgress] = useState({
    totalSessions: 0,
    completedSessions: 0,
    progressPercentage: 0,
  });
  // Modal toggle visibility state
  const [showModal, setShowModal] = useState(false);

  const fetchSessionsAndProgress = async () => {
    try {
      setLoading(true);

      const sessionData = await sessionService.getCourseSession(courseId);
      console.log("Session Data", sessionData);

      const progressData = await enrollmentService.getCourseProgress(courseId);
      console.log("Progress Data Log", progressData);

      const {
        totalSessions,
        completedSessions,
        progressPercentage,
        sessions: progressSessions = [],
      } = progressData || {};

      setCourseProgress({
        totalSessions: totalSessions || 0,
        completedSessions: completedSessions || 0,
        progressPercentage: progressPercentage || 0,
      });

      const sessionsWithProgress = sessionData.map((session) => {
        const sessionProgress = progressSessions.find(
          (p) => p.id === session.id
        );
        return {
          ...session,
          isCompleted: sessionProgress ? sessionProgress.isCompleted : false,
        };
      });

      setSessions(sessionsWithProgress);
      setLoading(false);

      if (completedSessions === totalSessions && totalSessions > 0) {
        setShowModal(true);
      }
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
            ? { ...session, isProcessing: true }
            : session
        )
      );

      await enrollmentService.markSessionAsCompleted(sessionId, courseId);

      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, isCompleted: true, isProcessing: false }
            : session
        )
      );

      await fetchSessionsAndProgress();
    } catch (err) {
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, isProcessing: false }
            : session
        )
      );
      console.error("Error marking session as completed:", err);
      setError("Failed to mark session as completed. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSubmitReview = async (rating, comment) => {
    try {
      const response = await reviewService.addReview(courseId, rating, comment);
      console.log("Review submitted", response);
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="p-16">
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
                  <div
                    className="text-gray-500 mb-4"
                    dangerouslySetInnerHTML={{ __html: session.description }}
                  />
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
      <Button onClick={onBack} variant="outline" className="mt-10">
        Back to Courses
      </Button>

      {showModal && (
        <RatingModal
          courseId={courseId}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}
