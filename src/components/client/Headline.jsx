import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiConfig } from '../../Services/GlobalApi';
const Headline = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    axios.get(`${apiConfig.Base_Url}api/headlines/`)
     .then(response => {
        setHeadline(response.data.Line);
      })
     .catch(error => {
        console.error('There was an error fetching the headline!', error);
      });
  }, []);

  return (
    <div className="bg-yellow-200 flex items-center p-4 shadow-lg overflow-hidden whitespace-nowrap select-none md:flex-row flex-col">
      <div className="text-3xl font-bold text-brown-800 mr-4 md:w-1/4 w-full">
        VISHWAKARMA NEWS
      </div>
      <div className="text-3xl font-bold text-brown-800 flex-1 overflow-hidden whitespace-nowrap md:w-3/4 w-full">
        <div className="inline-block animation-marquee p-1">
          {headline}
        </div>
      </div>
    </div>
  );
};

export default Headline;