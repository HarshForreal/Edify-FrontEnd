// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  Button,
  Label,
  Card,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "../components/ui";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.signup(email, password, role);

      if (data.newUser && data.message === "Signup successful") {
        navigate("/login");
      }
    } catch (error) {
      setError("Some Error Occurred", error);
    }
    console.log("Singning up with", email, password, role);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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

          <div className="mb-6">
            <Label>Role</Label>
            <RadioGroup
              value={role}
              onValueChange={setRole}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instructor" id="instructor" />
                <Label htmlFor="instructor">Instructor</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="text-red-500 pt-2">{error}</div>
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
