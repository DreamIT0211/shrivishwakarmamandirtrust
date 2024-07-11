import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { dakor } from "../../assets";
import { apiConfig } from "../../Services/GlobalApi";

const Trustees = () => {
  const [trustees, setTrustees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrustees = async () => {
      try {
        const response = await fetch(`${apiConfig.Base_Url}api/trustees/cli`);
        const data = await response.json();
        setTrustees(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTrustees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">ટ્રસ્ટી મંડળ</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="p-4 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trustees.map((trustee, index) => (
            <Card className="w-80" key={index}>
              <CardHeader floated={false} className="h-64 z-20">
                <img
                  src={trustee.trustee_image}
                  alt="profile-picture"
                  className="w-full h-full object-fit"
                />
                <div className="bg-red-300 h-6 w-5 z-30"></div>
              </CardHeader>
              <CardBody className="text-center bg-orange-50 rounded-md p-2 m-3">
                <Typography variant="h4" color="red" className="mb-2">
                  {trustee.trustee_title}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {trustee.trustee_name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-bold text-blue-500"
                  textGradient
                >
                  {trustee.trustee_description}
                </Typography>
                <Typography className="font-medium text-black" textGradient>
                  {trustee.trustee_mobileNo}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trustees;
