import React from "react";
import {
  FaBook,
  FaShippingFast,
  FaHeadset,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6">
          About BookBaazar
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          BookBaazar is more than an online bookstore — it's a digital dream
          built by a passionate IT student, aiming to combine reading,
          technology, and creativity in one platform.
        </p>
      </div>

      {/* Why Choose BookBaazar */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-12">
          Why Choose BookBaazar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaBook className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
            <p className="text-gray-600">
              Get titles across genres to satisfy every reader's
              taste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaShippingFast className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your books delivered within 2–3  days .
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <MdPayment className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Pay confidently via eSewa. 100% safe &
              secure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaHeadset className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Need help? We're here around the clock to assist you anytime.
            </p>
          </div>
          
        </div>
      </div>

      {/* Our Story */}
      <div className=" bg-indigo-50 p-8 rounded-lg ">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-2 lg:mb-0 lg:pr-8">
            <GiBookshelf className="text-8xl text-amber-700 mx-auto lg:mx-0" />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-amber-700 mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4">
              BookBaazar is more than just an online bookstore it’s a passion
              project brought to life by three dedicated IT students{" "}
              <strong> Laxmi</strong>,<strong> Mausami </strong> and{" "}
              <strong>Ritisha </strong>. Launched in 2025 as part of their
              final-year project, BookBaazar was built with a shared vision of
              making books easily accessible, beautifully presented, and
              enjoyable to explore whether users are logged in or just browsing.
            </p>
            <p className="text-gray-700 mb-4">
              From design to deployment, the platform was developed using modern
              technologies like{" "}
              <strong>
                React.js, Node.js, Express, MongoDB, and Tailwind CSS
              </strong>
              , BookBaazar focuses on speed, design, and seamless user
              experience. It also integrates{" "}
              <strong>eSewa payment gateway</strong> and{" "}
              <strong>smart book search</strong>.
            </p>
            <p className="text-gray-700">
              Today, it continues to evolve with new features like AI-powered
              video content, SEO optimization, and full-stack performance
              upgrades. This platform is just the beginning of a bigger journey!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl  p-4 mt-10 mb-16 bg-white bg-opacity-90  text-gray-800">
  <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2 text-amber-700">
    📞 Contact Us
  </h2>

  <p className="mb-4 text-base sm:text-lg">
    Have a question, feedback, or need assistance with your order? <br />
    <span className="block mt-2">We’re here to help!</span>
  </p>

  <p className="mb-4 text-base sm:text-lg">
    If you have any additional queries or require more details, feel free to reach out.
    Our support team will get back to you as soon as possible — response time may vary
    depending on the volume of queries, so we appreciate your patience.
  </p>

  <div className="mb-4 text-base sm:text-lg">
    <p className="mb-2">📧 <strong>Email:</strong> support@bookbazar.com</p>
    <p className="mb-2">☎️ <strong>Phone:</strong> +977-9800000000</p>
    <p className="mb-2">🕐 <strong>Support Hours:</strong> Sunday to Friday, 10 AM – 6 PM</p>
  </div>

  <p className="text-base sm:text-lg font-medium">
    Your satisfaction is our priority. We're always ready to assist you!
  </p>
</div>

    </div>
  );
};

export default About;
