import React from "react";
import { dakor, donation_qrcode } from "../../assets";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

const Donation = () => {
  return (
    <div className="relative h-screen">
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Donation </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-8 mt-20 space-y-8 lg:space-y-0">
        <Card  className="w-full max-w-lg h-auto">
          <CardHeader color="amber" className="text-center">
            <Typography variant="h2" color="white">
              If you want too Donate
            </Typography>
          </CardHeader>
          <CardBody>
          <img
            src={donation_qrcode}
            alt="background image"
            className="w-full max-h-96 object-contain rounded-xl filter "
          />
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
    </div>
  );
};

export default Donation;
