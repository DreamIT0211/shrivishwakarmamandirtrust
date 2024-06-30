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
import FooterWithSocialLinks from "./FooterWithSocialLinks";

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
      await axios.post("http://localhost:3000/api/contact", formData);
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
          {/* <p className="text-lg font-medium">Experience the divine</p> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="flex justify-center mt-20">
        <Card className="w-full max-w-lg">
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
      </div>
      <div className="mt-3">
        <TempleMap />
      </div>
    </>
  );
};

export default ContactUs;
