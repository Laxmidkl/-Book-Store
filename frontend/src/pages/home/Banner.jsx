// import React from "react";
// import bannerImg from "../../assets/banner.png";
// import backgroundImage from "../../assets/backgroundImg.jpg"

// function BANNER() {
//   return (
//     <div 
//     className="flex flex-col md:flex-row-reverse  justify-between items-center gap-12 h-screen bg-cover bg-center bg-no-repeat  "
//      style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Text section */}
//       <div className="md:w-1/2 w-full flex items-center md:justify-end">
//         {/* <img src={bannerImg} alt="" className=" h-96  mr-16"/> */}
//       </div>

//       {/* Img section  */}
//       <div className="md:w-1/2 w-full text-white px-10">
//         <h1 className="md:text-5xl text-2xl font-medium mb-7">
//           New Releases This Week
//         </h1>
//         <p className="mb-10">
//           It's time to update your reading list with some of the latest and
//           greatest releases in the literary world. From heart-pumping thrillers
//           to captivating memoirs, this week's new releases offer something for
//           everyone
//         </p>

       
//       </div>
//     </div>
//   );
// }

// export default BANNER;



// import React from "react";
// import backgroundImage from "../../assets/backgroundImg.jpg";

// function BANNER() {
//   return (
//     <div 
//       className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 md:gap-12 min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Empty image container (maintains layout structure) */}
//       <div className="md:w-1/2 w-full flex items-center justify-center md:justify-end pt-10 md:pt-0">
//         {/* This div maintains the space where your bannerImg would go */}
//         <div className="h-48 md:h-96 w-full max-w-md"></div>
//       </div>

//       {/* Text content section */}
//       <div className="md:w-1/2 w-full text-white px-6 md:px-10 pb-10 md:pb-0">
//         <h1 className="text-3xl md:text-5xl font-medium mb-4 md:mb-7">
//           New Releases This Week
//         </h1>
//         <p className="text-base md:text-lg mb-6 md:mb-10 leading-relaxed">
//           It's time to update your reading list with some of the latest and
//           greatest releases in the literary world. From heart-pumping thrillers
//           to captivating memoirs, this week's new releases offer something for
//           everyone.
//         </p>
        
//         {/* Mobile-optimized button */}
//         <button className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-sm md:text-base transition duration-300">
//           Browse New Arrivals
//         </button>
//       </div>
//     </div>
//   );
// }

// export default BANNER;

import React from "react";
import backgroundImage from "../../assets/backgroundImg.jpg";

function BANNER() {
  return (
    <div 
      className="flex flex-col md:flex-row-reverse justify-between items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Empty image container (maintains layout structure) */}
      <div className="md:w-1/2 w-full h-1/3 md:h-auto flex items-center justify-center md:justify-end">
        {/* This div maintains the space where your bannerImg would go */}
        <div className="h-full md:h-96 w-full max-w-md"></div>
      </div>

      {/* Text content section - now centered on mobile */}
      <div className="md:w-1/2 w-full h-2/3 md:h-auto text-white px-6 md:px-10 flex flex-col justify-center items-center md:items-start md:ml-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-medium mb-12 md:mb-7">
          📚 BookBazar Online Bookstore
        </h1>
        <p className="text-base md:text-[inherit] mb-36 md:mb-10 max-w-md md:max-w-none md:leading-relaxed">
         BookBazar is a user-friendly and dynamic e-commerce web application designed for book lovers to easily discover, explore, and purchase a wide range of books across multiple categories. Built with modern web technologies, BookBazar offers a seamless experience for both customers and admins.
         Whether you're passionate about <strong> fiction</strong> , <strong> technology </strong>,  or <strong> adventure </strong>, BookBazar brings an extensive digital shelf right to your fingertips.
        </p>
      </div>
    </div>
  );
}

export default BANNER;