import React from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { HiDocumentText } from "react-icons/hi2";
import { useState } from "react";
import { motion } from "framer-motion";
import { Pdf } from "../../assets";
import style from '../../style'

const PdfComponent = () => {
  const [isHovered, setIsHovered] = useState(false);

  const openPdf = () => {
    window.open(Pdf, "_new"); // Open PDF file in a new tab
  };
  const isAndroidDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isAndroidDevice) {
    return (
      <Card
        className="relative md:m-10 sm:m-5 p-2 m-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="flex flex-col md:flex-row justify-between items-center">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 md:mb-0 md:m-10 p-1 text-center md:text-left"
          >
            શ્રી વિશ્વકર્મા મંદિર ડાકોર
          </Typography>
          <Button
            color="amber"
            onClick={openPdf}
            className={`object-cover flex justify-center items-center w-full md:w-1/6 p-2 h-1/3 md:h-auto md:ml-10 transition-transform duration-300 transform ${
              isHovered
                ? "scale-110 shadow-md bg-orange-400 md:ml-3 text-white"
                : "scale-100"
            }`}
          >
            <h3 className="hidden md:block">Download PDF</h3>
            <HiDocumentText className="ml-2 md:ml-5" size="30pt" />
          </Button>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Card
            className={`relative m-10 ${isHovered ? "shadow-lg bg-yellow-200" : "shadow-md"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardBody className="flex justify-between items-center">
              <Typography
                variant="h2"
                color="blue-gray"
                className={`mb-4 m-10 p-1 transition-transform duration-300 transform ${isHovered ? `${style.colors.navbartext}` : "text-blue-gray"}`}
              >
                શ્રી વિશ્વકર્મા મંદિર ડાકોર
              </Typography>
              <Button
                color="amber"
                onClick={openPdf}
                className={`object-cover flex justify-center items-center w-1/6 p-2 h-1/3 mr-10 transition-transform duration-300 transform ${
                  isHovered
                    ? "scale-110 shadow-md bg-orange-400 ml-3 text-white"
                    : "scale-100"
                }`}
              >
                <h3 className="font-bold">Open PDF</h3>
                <HiDocumentText className="ml-10" size="30pt" />
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }
};

export default PdfComponent;
