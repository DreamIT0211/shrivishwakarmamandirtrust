import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { dakor } from "../../assets";
import TempleMap from "./TempleMap";
import { apiConfig } from "../../Services/GlobalApi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send contact message
      await axios.post(`${apiConfig.Base_Url}api/contact`, formData);
      setSuccess(true);
    } catch (error) {
      setError("Failed to send message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">
            શ્રી વિશ્વકર્મા મંદિર ડાકોર
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8 mt-20 space-y-8 lg:space-y-0">
        <Card className="w-full max-w-lg h-auto">
          <CardHeader color="amber" className="text-center">
            <Typography variant="h2" color="white">
              Contact Us
            </Typography>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Name"
                  id="name"
                  name="name"
                  color="blue"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  color="blue"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Textarea
                  label="Message"
                  id="message"
                  name="message"
                  color="blue"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                color="amber"
                ripple="light"
                fullWidth
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {error && (
                <Alert color="red" className="mt-2">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert color="green" className="mt-2">
                  Message sent successfully!
                </Alert>
              )}
            </form>
          </CardBody>
        </Card>
        <div className="w-full max-w-lg h-auto bg-yellow-400 p-4">
          <div className="text-center text-red-600 font-bold text-lg">
        <Typography variant="h2" color="white">
               શ્રી વિશ્વકર્મા મંદિર ટ્રસ્ટ, ડાકોર
            </Typography>
          </div>
          <div className="bg-yellow-300 py-2 px-4 my-2 text-center font-semibold">
            IT EXEMPTION CERTI. 80(G)
          </div>
          <div className="flex justify-between bg-red-500 py-2 px-4 my-2 text-white font-bold">
            <span>NAME</span>
            <span>VISHWAKARMA MANDIR TRUST, DAKOR</span>
          </div>
          <div className="flex justify-between bg-blue-500 py-2 px-4 my-2 text-white font-bold">
            <span>TRUST REGISTRATION NO.</span>
            <span>A/408/KHEDA</span>
          </div>
          <div className="flex justify-between bg-pink-500 py-2 px-4 my-2 text-white font-bold">
            <span>PAN CARD NO.</span>
            <span>AAATV1800D</span>
          </div>
          <div className="flex justify-between bg-green-500 py-2 px-4 my-2 text-white font-bold">
            <span>IT EXEMPTION CERTI. 80(G) Registration Number</span>
            <span>AAATV1800DF20212</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <TempleMap />
      </div>
    </>
  );
};

export default ContactUs;
