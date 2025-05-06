// import React, { useState, useEffect } from "react";
// import { Button, Label, Card, Input } from "../components/ui";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Use AuthContext
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, role } = useAuth(); // Get login and role from AuthContext
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (role) {
//       if (role === "student") {
//         navigate("/student-dashboard");
//       } else if (role === "instructor") {
//         navigate("/instructor-dashboard");
//       }
//     }
//   }, [role, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login(email, password);

//       if (data && data.message === "Login successful") {
//         const { role } = data.userData;
//         if (role === "student") {
//           navigate("/student-dashboard");
//         } else if (role === "instructor") {
//           navigate("/instructor-dashboard");
//         }
//       }
//     } catch (error) {
//       setError("Invalid credentials. Please try again.", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <Card className="p-6 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-center">Login</h2>
//         <p className="text-sm mb-4 text-center text-slate-500">
//           Explore a wide range of courses
//         </p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <Label htmlFor="email">Email: </Label>
//             <Input
//               placeholder="Enter Your Email"
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-2"
//             />
//           </div>
//           <div className="mb-6">
//             <Label htmlFor="password">Password: </Label>
//             <Input
//               placeholder="Enter Your Password"
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-2"
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//           <p className="mt-4 text-center text-gray-400">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-black hover:underline">
//               Signup
//             </Link>
//           </p>
//         </form>
//       </Card>
//       <div></div>
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Button, Label, Card, Input } from "../components/ui";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { toast } from "react-toastify";
// import { Dialog, DialogTitle } from "../components/ui"; // Assuming Dialog is imported correctly

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const [googleCredential, setGoogleCredential] = useState(null);
//   const [showRoleSelection, setShowRoleSelection] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const { login, role: userRole, googleLogin } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Current user role in Login:", userRole);
//     if (userRole) {
//       if (userRole === "student") {
//         navigate("/student-dashboard");
//       } else if (userRole === "instructor") {
//         navigate("/instructor-dashboard");
//       }
//     }
//   }, [userRole, navigate]);

//   // Modified Google Login handler to show role selection first
//   const handleGoogleLoginInitiate = (credentialResponse) => {
//     setGoogleCredential(credentialResponse?.credential);
//     setShowRoleSelection(true);
//   };

//   const completeGoogleLogin = async () => {
//     try {
//       if (!googleCredential || !selectedRole) {
//         toast.error("Please select a role to continue");
//         return;
//       }

//       console.log("Attempting Google login with role:", selectedRole);

//       // Call our googleLogin function in the AuthContext
//       const data = await googleLogin(googleCredential, selectedRole);

//       console.log("Google login successful:", data);
//       toast.success("Logged in successfully!");

//       // Navigation is now handled by the useEffect that watches userRole
//     } catch (error) {
//       console.error("Error during Google login:", error);
//       toast.error(error.response?.data?.message || "Google login failed");
//     }
//   };

//   const handleRoleSubmit = (role) => {
//     setSelectedRole(role);
//     setShowRoleSelection(false);
//   };

//   // Complete Google login once role is selected
//   useEffect(() => {
//     if (googleCredential && selectedRole && !showRoleSelection) {
//       completeGoogleLogin();
//     }
//   }, [selectedRole, showRoleSelection]);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <Card className="p-6 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-center">Login</h2>
//         <p className="text-sm mb-4 text-center text-slate-500">
//           Explore a wide range of courses
//         </p>

//         {/* Traditional Login Form */}
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             try {
//               const data = await login(email, password);

//               if (data && data.message === "Login successful") {
//                 const { role } = data.userData;
//                 if (role === "student") {
//                   navigate("/student-dashboard");
//                 } else if (role === "instructor") {
//                   navigate("/instructor-dashboard");
//                 }
//               }
//             } catch (error) {
//               setError("Invalid credentials. Please try again.");
//               toast.error("Login failed! Invalid credentials.");
//             }
//           }}
//         >
//           <div className="mb-4">
//             <Label htmlFor="email">Email: </Label>
//             <Input
//               placeholder="Enter Your Email"
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-2"
//             />
//           </div>

//           <div className="mb-6">
//             <Label htmlFor="password">Password: </Label>
//             <Input
//               placeholder="Enter Your Password"
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-2"
//             />
//           </div>

//           <Button type="submit" className="w-full">
//             Login
//           </Button>

//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//           <p className="mt-4 text-center text-gray-400">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-black hover:underline">
//               Signup
//             </Link>
//           </p>
//         </form>
//         {/* Google Sign-In Button */}
//         <div className="flex justify-center items-center my-4">
//           <div className="border-t border-gray-300 w-1/3"></div>
//           <p className="mx-2 text-sm text-gray-500">OR</p>
//           <div className="border-t border-gray-300 w-1/3"></div>
//         </div>

//         <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//           <GoogleLogin
//             onSuccess={handleGoogleLoginInitiate}
//             onError={(err) => {
//               console.error("Google login failed:", err);
//               toast.error("Google login failed.");
//             }}
//           />
//         </GoogleOAuthProvider>
//       </Card>

//       {/* Role Selection Dialog */}
//       {showRoleSelection && (
//         <Dialog
//           open={showRoleSelection}
//           onClose={() => setShowRoleSelection(false)}
//         >
//           <div className="p-6">
//             <DialogTitle className="text-lg font-medium mb-4">
//               Select Your Role
//             </DialogTitle>

//             <div className="space-y-4">
//               <p className="text-sm text-gray-500">
//                 Please select your role to continue with Google Sign-In
//               </p>

//               <div className="flex flex-col gap-3">
//                 <Button
//                   onClick={() => handleRoleSubmit("student")}
//                   className="w-full"
//                 >
//                   Student
//                 </Button>

//                 <Button
//                   onClick={() => handleRoleSubmit("instructor")}
//                   className="w-full"
//                 >
//                   Instructor
//                 </Button>
//               </div>

//               <Button
//                 onClick={() => setShowRoleSelection(false)}
//                 variant="outline"
//                 className="w-full mt-2"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { Button, Label, Card, Input } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Dialog, DialogTitle } from "../components/ui"; // Assuming Dialog is imported correctly

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [googleCredential, setGoogleCredential] = useState(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const { login, role: userRole, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user role in Login:", userRole);
    if (userRole) {
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "instructor") {
        navigate("/instructor-dashboard");
      }
    }
  }, [userRole, navigate]);

  // Modified Google Login handler to show role selection first
  const handleGoogleLoginInitiate = (credentialResponse) => {
    setGoogleCredential(credentialResponse?.credential);
    setShowRoleSelection(true);
  };

  const completeGoogleLogin = async () => {
    try {
      if (!googleCredential) {
        toast.error("Google login failed. Please try again.");
        return;
      }

      // Step 1: Call the backend to check if the user already exists
      const response = await googleLogin(googleCredential, selectedRole);
      const userData = response?.data?.user;

      if (!userData) {
        // If no user data, log an error
        toast.error("Error: User data is missing.");
        return;
      }

      // If user exists, log them in directly
      if (userData.role) {
        // Role exists, complete login process
        toast.success("Logged in successfully!");
        if (userData.role === "student") {
          navigate("/student-dashboard");
        } else if (userData.role === "instructor") {
          navigate("/instructor-dashboard");
        }
      } else {
        // Prompt role selection
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleRoleSubmit = async (role) => {
    try {
      setSelectedRole(role);
      setShowRoleSelection(false);

      const response = await googleLogin(googleCredential, role);

      console.log("Google login successful:", response);
      toast.success("Logged in successfully!");

      // Navigate based on role
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "instructor") {
        navigate("/instructor-dashboard");
      }
    } catch (error) {
      console.error("Error during role selection:", error);
      toast.error("Role selection failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <p className="text-sm mb-4 text-center text-slate-500">
          Explore a wide range of courses
        </p>

        {/* Traditional Login Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const data = await login(email, password);

              if (data && data.message === "Login successful") {
                const { role } = data.userData;
                if (role === "student") {
                  navigate("/student-dashboard");
                } else if (role === "instructor") {
                  navigate("/instructor-dashboard");
                }
              }
            } catch (error) {
              setError("Invalid credentials. Please try again.");
              toast.error("Login failed! Invalid credentials.");
            }
          }}
        >
          <div className="mb-4">
            <Label htmlFor="email">Email: </Label>
            <Input
              placeholder="Enter Your Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Password: </Label>
            <Input
              placeholder="Enter Your Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black hover:underline">
              Signup
            </Link>
          </p>
        </form>
        {/* Google Sign-In Button */}
        <div className="flex justify-center items-center my-4">
          <div className="border-t border-gray-300 w-1/3"></div>
          <p className="mx-2 text-sm text-gray-500">OR</p>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginInitiate}
            onError={(err) => {
              console.error("Google login failed:", err);
              toast.error("Google login failed.");
            }}
          />
        </GoogleOAuthProvider>
      </Card>

      {/* Role Selection Dialog */}
      {showRoleSelection && (
        <Dialog
          open={showRoleSelection}
          onClose={() => setShowRoleSelection(false)}
        >
          <div className="p-6">
            <DialogTitle className="text-lg font-medium mb-4">
              Select Your Role
            </DialogTitle>

            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Please select your role to continue with Google Sign-In
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handleRoleSubmit("student")}
                  className="w-full"
                >
                  Student
                </Button>

                <Button
                  onClick={() => handleRoleSubmit("instructor")}
                  className="w-full"
                >
                  Instructor
                </Button>
              </div>

              <Button
                onClick={() => setShowRoleSelection(false)}
                variant="outline"
                className="w-full mt-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Login;
