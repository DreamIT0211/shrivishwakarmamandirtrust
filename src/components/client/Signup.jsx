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
  Spinner
} from "@material-tailwind/react";
import { apiConfig } from "../../Services/GlobalApi";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    FullName: "",
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
      const response = await axios.post(
        `${apiConfig.Base_Url}api/users/register`,
        formData
      );
      setMessage(response.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
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
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Username"
            size="lg"
            name="Username"
            color="blue"
            value={formData.Username}
            onChange={handleChange}
          />
          <div className="relative">
            <Input
              label="Password"
              size="lg"
              type={showPassword ? "text" : "password"}
              name="Password"
              color="blue"
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
          <Input
            label="Email"
            size="lg"
            type="email"
            name="Email"
            color="blue"
            value={formData.Email}
            onChange={handleChange}
          />
          <Input
            label="Full Name"
            size="lg"
            name="FullName"
            color="blue"
            value={formData.FullName}
            onChange={handleChange}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="amber" className="text-white" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          {message && <Typography color="red" className="mt-4 text-center">{message}</Typography>}
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/signin" className="ml-1 font-bold text-blue-500 hover:underline">
              Sign In
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
