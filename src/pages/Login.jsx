import React, { useState, useEffect } from "react";
import { Button, Label, Card, Input } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Dialog, DialogTitle } from "../components/ui";

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

  const handleGoogleLoginInitiate = (credentialResponse) => {
    setGoogleCredential(credentialResponse?.credential);
    setShowRoleSelection(true);
  };

  const handleRoleSubmit = async (role) => {
    try {
      setSelectedRole(role);
      setShowRoleSelection(false);

      const response = await googleLogin(googleCredential, role);

      console.log("Google login successful:", response);
      toast.success("Logged in successfully!");

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
        {/* Google SignIn Button */}
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

      {/* Role Selection Box */}
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
