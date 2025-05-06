// import React, { useState } from "react";
// import { Button, Card } from "../components/ui"; // Assuming these are custom components
// import { useNavigate } from "react-router-dom"; // For navigating to other pages
// import authService from "../services/authService"; // Import authService
// import { toast } from "react-toastify";
// const RoleSelection = () => {
//   const [role, setRole] = useState(""); // Track the selected role
//   const navigate = useNavigate(); // For navigation

//   // Handle role selection
//   const handleRoleSelect = async (selectedRole) => {
//     setRole(selectedRole); // Set selected role
//     console.log("Selected Role:", selectedRole);

//     // Send the selected role to the backend to update the user's role
//     try {
//       const response = await authService.updateRole(selectedRole); // Assuming you have this function

//       if (response.message === "Role updated") {
//         // Redirect to the correct dashboard
//         if (selectedRole === "student") {
//           navigate("/student-dashboard");
//         } else if (selectedRole === "instructor") {
//           navigate("/instructor-dashboard");
//         }
//       }
//     } catch (error) {
//       console.log("Error updating role:", error);
//       toast.error("Error updating role. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <Card className="p-6 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-center">Select Your Role</h2>
//         <p className="text-sm mb-4 text-center text-slate-500">
//           Please choose your role to proceed
//         </p>

//         <div className="flex justify-around mt-4">
//           <Button onClick={() => handleRoleSelect("student")} className="w-1/3">
//             Student
//           </Button>
//           <Button
//             onClick={() => handleRoleSelect("instructor")}
//             className="w-1/3"
//           >
//             Instructor
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default RoleSelection;
