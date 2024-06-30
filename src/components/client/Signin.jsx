import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UsernameOrEmail: "",
    Password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.UsernameOrEmail || !formData.Password) {
        setMessage("Please provide both username/email and password.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

      const tokenPayload = JSON.parse(atob(response.data.token.split(".")[1]));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", tokenPayload.username);
      localStorage.setItem("userEmail", tokenPayload.useremail);
      localStorage.setItem("userRole", tokenPayload.userrole);

      const userRole = localStorage.getItem("userRole");

      setTimeout(() => {
        setLoading(false);
        navigate(userRole === "admin" ? "/dashboard" : "/home");
      }, 1000);
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen -mt-10 p-3 select-none">
      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="text-amber-400 animate-spin">
            <ImSpinner9 className="h-12 w-12" />
          </div>
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader
          variant="gradient"
          color="amber"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Username or Email"
            color="blue"
            size="lg"
            name="UsernameOrEmail"
            value={formData.UsernameOrEmail}
            onChange={handleChange}
          />
          <div className="relative">
            <Input
              label="Password"
              size="lg"
              color="blue"
              type={showPassword ? "text" : "password"}
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3 text-blue-500 focus:outline-none"
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="amber" className="text-white" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          {message && <Typography color="red" className="mt-4 text-center">{message}</Typography>}
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link to="/signup" className="ml-1 font-bold text-blue-500 hover:underline">
              Sign up
            </Link>
          </Typography>
          <Typography variant="small" className="mt-2 flex justify-center">
            {/* <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot your password?
            </Link> */}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
