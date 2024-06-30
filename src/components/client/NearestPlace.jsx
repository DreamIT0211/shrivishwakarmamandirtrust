import React from "react";
import { dakor, mahadev, dakorMain } from "../../assets";

const NearestPlace = () => {
  const places = [
    {
      name: "Ranchod Temple, Dakor",
      img: dakorMain,
      description: "Bhalka Tirth description here...",
    },
    {
      name: "Gomti Lake, Dakor",
      img: dakor,
      description: "The lake is just 2 mins walk from Ranchod temple.",
    },
    {
      name: "Galteshwar Mahadev Temple, Dakor",
      img: mahadev,
      description: "Prachi Tirth description here...",
    },
  ];

  return (
    <div className="bg-yellow-100 p-5 sm:p-10 select-none hover:text-amber-900 transition ease-in-out duration-300">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
        Visiting Places Near Vishwakarma Temple
      </h2>
      <div className="flex flex-wrap justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8">
        {places.map((place, index) => (
          <div
            key={index}
            className="max-w-xs w-full sm:w-1/2 lg:w-1/3 rounded-md overflow-hidden shadow-lg hover:shadow-2xl bg-amber-100 m-2 sm:m-0 text-black hover:text-amber-900 transition ease-in-out duration-300"
          >
            <img
              className="w-full h-48 object-cover"
              src={place.img}
              alt={place.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{place.name}</div>
              <p className="text-gray-700 text-base">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestPlace;
