// // src/components/client/ApkDownloadPopup.jsx
// import React, { useState, useEffect } from "react";

// const ApkDownloadPopup = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Check if the popup has been shown before
//     if (!localStorage.getItem('apkPopupShown')) {
//       setIsVisible(true);
//     }
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     localStorage.setItem('apkPopupShown', 'true'); // Set a flag to prevent showing again
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded-lg shadow-lg text-center">
//         <h2 className="text-xl font-bold mb-4">Download VMT Dakor App</h2>
//         <p className="mb-4">Get the latest version of the VMT Dakor app for Android devices.</p>
//         <a
//           href="/assets/apk/vmtdakor.apk"
//           download
//           className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
//         >
//           Download APK
//         </a>
//         <button
//           onClick={handleClose}
//           className="mt-4 text-gray-500 hover:text-gray-700 "
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ApkDownloadPopup;

// // src/components/client/ApkDownloadPopup.jsx
// import React, { useState, useEffect } from "react";
// import { FaDownload, FaTimes } from "react-icons/fa"; // Import icons from react-icons

// const ApkDownloadPopup = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Check if the popup has been shown before
//     const popupShown = localStorage.getItem("apkPopupShown");
//     // Check if the screen width is less than or equal to 768px (mobile devices)
//     const isMobile = window.innerWidth <= 768;

//     if (isMobile && !popupShown) {
//       setIsVisible(true);
//     }
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     localStorage.setItem("apkPopupShown", "true"); // Set a flag to prevent showing again
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
//       <div className="relative bg-amber-200 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
//         {/* Close button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-semibold mb-4">Download VMT Dakor App</h2>
//         <p className="mb-4 text-black">
//           Get the latest version of the VMT Dakor app for Android devices.
//         </p>
//         <a
//           href="https://drive.google.com/file/d/11tbk8WbXai1j8VTol9Me6csshTD_fZY-/view?usp=sharing"
//           className="bg-purple-600 text-white px-4 py-2 rounded inline-flex items-center space-x-2 hover:bg-purple-700 hover:text-yellow-400 transition duration-300"
//         >
//           <FaDownload size={16} />
//           <span>Download APK</span>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ApkDownloadPopup;


// ApkDownloadPopup.jsx
import React, { useState, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

const ApkDownloadPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const popupShown = localStorage.getItem("apkPopupShown");
    const isMobile = window.innerWidth <= 768;

    if (isMobile && !popupShown) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("apkPopupShown", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-amber-200 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Download VMT Dakor App</h2>
        <p className="mb-4 text-black">
          Get the latest version of the VMT Dakor app for Android devices.
        </p>
        <a
          href="https://drive.google.com/file/d/11tbk8WbXai1j8VTol9Me6csshTD_fZY-/view?usp=sharing"
          className="bg-purple-600 text-white px-4 py-2 rounded inline-flex items-center space-x-2 hover:bg-purple-700 hover:text-yellow-400 transition duration-300"
        >
          <FaDownload size={16} />
          <span>Download APK</span>
        </a>
      </div>
    </div>
  );
};

export default ApkDownloadPopup;


