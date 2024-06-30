import React from 'react';
import { testpic } from '../../assets';
import FooterWithSocialLinks from './FooterWithSocialLinks';

export function DefaultGallery() {
  const data = [
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
    {
      imageLink:
        testpic,
    },
  ];

  return (
    <>
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
    <div className='mt-3'>
      <FooterWithSocialLinks />
    </div>
    </>
  );
}

export default DefaultGallery;
