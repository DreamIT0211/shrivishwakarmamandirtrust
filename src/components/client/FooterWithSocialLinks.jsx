import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import {
  FaHome,
  FaUser,
  FaVideo,
  FaCalendarAlt,
  FaImages,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import style from "../../style";
import { apiConfig } from "../../Services/GlobalApi";

const LINKS = [
  {
    title: "Useful Links",
    items: [
      { icon: <FaHome />, text: "Home", id: "Home" },
      { icon: <FaUser />, text: "Trustee", id: "Trustee" },
      { icon: <FaVideo />, text: "Live Darshan", id: "livedarshan" },
      { icon: <FaCalendarAlt />, text: "Events", id: "events" },
      { icon: <FaImages />, text: "Gallery", id: "darshan" },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        icon: <FaMapMarkerAlt />,
        text: "Near Post Office Station Road, Dakor-388 225",
      },
      { icon: <FaEnvelope />, text: "dakorvmt@gmail.com" },
      { icon: <FaPhone />, text: "(02699) 244844" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function FooterWithSocialLinks() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await axios.get(`${apiConfig.Base_Url}api/site-visits`);
        setVisitorCount(response.data.visitorCount);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <footer
      className={`relative w-full ${style.colors.navbarbg} pt-4 ${style.colors.navbartext} mt-10 md:mt-4`}
    >
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography
            variant="h4"
            className="mb-6 hover:text-amber-900 transition ease-in-out duration-700"
          >
            Shri Vishwakarma Mandir Trust, Dakor
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="black"
                  className="mb-3 font-medium opacity-60"
                >
                  {title}
                </Typography>
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center group duration-700 ease-in-out hover:text-amber-900"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <Typography
                      as="a"
                      href={`#${item.id}`}
                      className={`py-1.5 font-normal transition-colors ${style.colors.navbartext} duration-700 ease-in-out group-hover:text-amber-900`}
                    >
                      {item.text}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://vmtdakor.org/">vmtdakor.org</a>. All Rights Reserved.
            <span className="text-black transition duration-700 ease-in-out hover:text-cyan-400">
              &nbsp; <a href="https://www.dreamitinfotech.in/">Developed by DreamIT Infotech Pvt Ltd.</a>
            </span>
          </Typography>
          {visitorCount !== null && (
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
            >
              Visitor Count: {visitorCount}
            </Typography>
          )}
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://www.facebook.com/profile.php?id=61562611431358&mibextid=LQQJ4d"
              target="_blank"
              className="opacity-80 transition-opacity hover:opacity-100 hover:bg-light-blue-700 hover:rounded-full hover:scale-125 p-1"
            >
              <svg
                className="h-5 w-5 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography
              as="a"
              href="https://www.instagram.com/shrivishwakarmamandirdakor?igsh=YWt1YTdvOXZuajQ3"
              target="_blank"
              className="opacity-80 transition-opacity hover:opacity-100 hover:bg-pink-400 hover:rounded-full hover:scale-125 p-1"
            >
              <svg
                className="h-5 w-5 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography
              as="a"
              href="https://www.youtube.com/@ShriVishwakarmaMandirTrust"
              target="_blank"
              className="opacity-80 transition-opacity hover:opacity-100 hover:bg-red-600 hover:rounded-full hover:scale-125 p-1"
            >
              <svg
                className="h-5 w-5 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M23.498 6.186a3.001 3.001 0 00-2.113-2.122C19.69 3.5 12 3.5 12 3.5s-7.69 0-9.385.563a3.001 3.001 0 00-2.113 2.122A31.378 31.378 0 000 12a31.378 31.378 0 00.502 5.814 3.001 3.001 0 002.113 2.122C4.31 20.5 12 20.5 12 20.5s7.69 0 9.385-.563a3.001 3.001 0 002.113-2.122A31.378 31.378 0 0024 12a31.378 31.378 0 00-.502-5.814zM9.75 15.02V8.98l6.45 3.02-6.45 3.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterWithSocialLinks;
