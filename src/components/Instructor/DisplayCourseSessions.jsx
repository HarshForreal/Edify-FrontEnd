// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import sessionService from "../../services/sessionService";
// import { Trash, Plus } from "lucide-react";
// import { Button, Card, CardHeader, CardContent, CardTitle } from "../ui/index";
// import ReactPlayer from "react-player";
// import InstructorSidebar from "../Instructor/InstructorSidebar";
// import { useNavigate } from "react-router-dom";
// import CreateNewSession from "./CreateNewSession";
// import { toast } from "react-toastify";
// import AlertModal from "./AlertModal";

// const DisplayCourseSessions = () => {
//   const { courseId } = useParams();
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showCreateSession, setShowCreateSession] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sessionToDelete, setSessionToDelete] = useState(null);
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/instructor-dashboard");
//   };

//   const handleAddSession = () => {
//     setShowCreateSession(true);
//   };

//   const handleCancelCreateSession = () => {
//     setShowCreateSession(false);
//   };

//   const handleDeleteSession = async (sessionId) => {
//     try {
//       const response = await sessionService.deleteSession(sessionId);
//       if (response) {
//         setSessions((prevSessions) =>
//           prevSessions.filter((session) => session.id !== sessionId)
//         );
//         toast.success("Session deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting session", error);
//       toast.error("Failed to delete session");
//     }
//   };

//   const handleShowAlertModal = (sessionId) => {
//     setSessionToDelete(sessionId); // Set the session to be deleted
//     setIsModalOpen(true); // Show the alert modal
//   };

//   const handleCloseAlertModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setSessionToDelete(null); // Reset session to delete
//   };

//   const fetchSessions = async () => {
//     try {
//       const sessionsData = await sessionService.getCourseSession(courseId);
//       setSessions(sessionsData);
//       setLoading(false);
//     } catch (err) {
//       setError("Error fetching sessions.", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, [courseId]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="flex-1 overflow-auto">
//         {showCreateSession ? (
//           <CreateNewSession
//             onCancel={handleCancelCreateSession}
//             courseId={courseId}
//           />
//         ) : (
//           <>
//             <div className="p-6 flex justify-between items-center">
//               <h1 className="text-2xl font-bold">Course Sessions</h1>
//               <Button
//                 className="flex items-center gap-2"
//                 onClick={handleAddSession}
//               >
//                 <Plus size={18} />
//                 <span>Add Session</span>
//               </Button>
//             </div>

//             <div className="px-6">
//               {loading && <div>Loading...</div>}
//               {error && <div className="text-red-500">{error}</div>}

//               {!loading && !error && sessions.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {sessions.map((session) => (
//                     <Card
//                       key={session.id}
//                       className="shadow-lg rounded-lg overflow-hidden"
//                     >
//                       <CardHeader>
//                         <CardTitle className="text-xl font-semibold">
//                           {session.title}
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         {session.videoUrl && (
//                           <div className="relative w-full pt-[56.25%] bg-gray-300 rounded-lg overflow-hidden mb-4">
//                             <ReactPlayer
//                               url={session.videoUrl}
//                               light={session.thumbnailUrl}
//                               playing={false}
//                               width="100%"
//                               height="100%"
//                               controls={true}
//                               className="absolute top-0 left-0"
//                             />
//                           </div>
//                         )}
//                         <div
//                           className="mb-4"
//                           dangerouslySetInnerHTML={{
//                             __html: session.description,
//                           }}
//                         />
//                         <Button
//                           variant="destructive"
//                           className="mt-4 group"
//                           onClick={() => handleShowAlertModal(session.id)} // Open modal when clicking delete
//                         >
//                           <Trash size={16} className="mr-2" />
//                           Trash
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <Card>
//                   <CardContent className="p-8 text-center">
//                     <h3 className="text-lg font-semibold mb-2">
//                       No sessions available for this course.
//                     </h3>
//                   </CardContent>
//                 </Card>
//               )}
//               <Button onClick={handleBack} className="mt-6 mb-6">
//                 Back
//               </Button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* AlertModal for confirming session deletion */}
//       <AlertModal
//         isOpen={isModalOpen}
//         onClose={handleCloseAlertModal}
//         onConfirm={() => handleDeleteSession(sessionToDelete)} // Pass the correct function
//       />
//     </div>
//   );
// };

// export default DisplayCourseSessions;

// ! responsive
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sessionService from "../../services/sessionService";
import { Trash, Plus } from "lucide-react";
import { Button, Card, CardHeader, CardContent, CardTitle } from "../ui/index";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import CreateNewSession from "./CreateNewSession";
import { toast } from "react-toastify";
import AlertModal from "./AlertModal";

const DisplayCourseSessions = () => {
  const { courseId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/instructor-dashboard");
  };

  const handleAddSession = () => {
    setShowCreateSession(true);
  };

  const handleCancelCreateSession = () => {
    setShowCreateSession(false);
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await sessionService.deleteSession(sessionId);
      if (response) {
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== sessionId)
        );
        toast.success("Session deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting session", error);
      toast.error("Failed to delete session");
    }
  };

  const handleShowAlertModal = (sessionId) => {
    setSessionToDelete(sessionId);
    setIsModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsModalOpen(false);
    setSessionToDelete(null);
  };

  const fetchSessions = async () => {
    try {
      const sessionsData = await sessionService.getCourseSession(courseId);
      setSessions(sessionsData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching sessions.", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [courseId]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <InstructorSidebar />

      <div className="flex-1 overflow-auto p-6">
        {showCreateSession ? (
          <CreateNewSession
            onCancel={handleCancelCreateSession}
            courseId={courseId}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Course Sessions</h1>
              <Button
                className="flex items-center gap-2"
                onClick={handleAddSession}
              >
                <Plus size={18} />
                <span>Add Session</span>
              </Button>
            </div>

            <div className="px-6">
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-500">{error}</div>}

              {!loading && !error && sessions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sessions.map((session) => (
                    <Card
                      key={session.id}
                      className="shadow-lg rounded-lg overflow-hidden"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          {session.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {session.videoUrl && (
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
                        )}
                        <div
                          className="mb-4"
                          dangerouslySetInnerHTML={{
                            __html: session.description,
                          }}
                        />
                        <Button
                          variant="destructive"
                          className="mt-4 group"
                          onClick={() => handleShowAlertModal(session.id)}
                        >
                          <Trash size={16} className="mr-2" />
                          Trash
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      No sessions available for this course.
                    </h3>
                  </CardContent>
                </Card>
              )}
              <Button onClick={handleBack} className="mt-6 mb-6">
                Back
              </Button>
            </div>
          </>
        )}
      </div>

      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseAlertModal}
        onConfirm={() => handleDeleteSession(sessionToDelete)}
      />
    </div>
  );
};

export default DisplayCourseSessions;
