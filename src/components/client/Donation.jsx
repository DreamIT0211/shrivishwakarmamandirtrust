import React from "react";
import { dakor, donation_qrcode } from "../../assets";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const Donation = () => {
  return (
    <div className="relative p-2 md:p-0 lg:p-0">
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
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 mt-0 md:mt-10 lg:mt-10 space-y-8 lg:space-y-0">
        <div className="h-1/2 w-64 bg-white shadow-md overflow-hidden rounded-xl transition duration-700 ease-in-out hover:shadow-2xl">
          <img
            src={donation_qrcode}
            alt="ScanQR"
            className="w-full h-full object-cover filter"
          />
        </div>
        <div className="w-full max-w-lg h-auto bg-cyan-400 p-4 rounded-xl shadow-md transition duration-700 ease-in-out hover:shadow-2xl group">
          <div className="text-center text-red-600 font-bold text-lg">
            <Typography variant="h2" color="white" className="transition duration-700 ease-in-out group-hover:text-yellow-400">
              શ્રી વિશ્વકર્મા મંદિર ટ્રસ્ટ, ડાકોર
            </Typography>
          </div>
          <div className="bg-yellow-300 py-2 px-4 my-2 text-center font-semibold">
            IT EXEMPTION CERTI. 80(G)
          </div>
          <div className="flex justify-between bg-red-500 py-2 px-4 my-2 text-white font-bold transition duration-700 ease-in-out group-hover:text-yellow-400">
            <span>NAME</span>
            <span>VISHWAKARMA MANDIR TRUST, DAKOR</span>
          </div>
          <div className="flex justify-between bg-blue-500 py-2 px-4 my-2 text-white font-bold transition duration-700 ease-in-out group-hover:text-yellow-400">
            <span>TRUST REGISTRATION NO.</span>
            <span>A/408/KHEDA</span>
          </div>
          <div className="flex justify-between bg-pink-500 py-2 px-4 my-2 text-white font-bold transition duration-700 ease-in-out group-hover:text-yellow-400">
            <span>PAN CARD NO.</span>
            <span>AAATV1800D</span>
          </div>
          <div className="flex justify-between bg-green-500 py-2 px-4 my-2 text-white font-bold transition duration-700 ease-in-out group-hover:text-yellow-400">
            <span>IT EXEMPTION CERTI. 80(G) Registration Number</span>
            <span>AAATV1800DF20212</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
