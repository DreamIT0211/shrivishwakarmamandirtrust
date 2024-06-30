import React from "react";
import { testpic } from "../../assets";
import { dakor } from "../../assets";
import FooterWithSocialLinks from "./FooterWithSocialLinks";

export function DefaultGallery() {
  const data = [
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
    {
      imageLink: testpic,
    },
  ];

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Gallery</h1>
          {/* <p className="text-lg font-medium">Experience the divine</p> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 m-4 p-4">
        {data.map(({ imageLink }, index) => (
          <div key={index}>
            <img
              className="h-80 w-full max-w-full rounded-lg object-cover object-center hover:shadow-xl hover:scale-105"
              src={imageLink}
              alt="gallery-photo"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DefaultGallery;
