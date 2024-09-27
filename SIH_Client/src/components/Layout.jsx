import React, { useState, useEffect } from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample testimonial data
const testimonials = [
  {
    text: "Working at GAIL has been a transformative experience. The focus on innovation and sustainability is inspiring.",
    author: "Employee A",
  },
  {
    text: "GAIL's commitment to the community makes me proud to be a part of this organization.",
    author: "Employee B",
  },
  {
    text: "The collaborative environment at GAIL encourages professional growth and development.",
    author: "Employee C",
  },
];

// Sample FAQ data
const faqData = [
  {
    question: "What does GAIL specialize in?",
    answer: "GAIL is a leader in natural gas, renewable energy, and various infrastructure projects.",
  },
  {
    question: "How can I apply for a job at GAIL?",
    answer: "Visit our careers page for more information on current job openings and application processes.",
  },
];

export default function Layout({ isChatBoxOpen }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);
  const images = [
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/img4.jpg",
    "/img/img5.jpg",
    "/img/img6.jpg",

  ];

  const [expandedEvent, setExpandedEvent] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Automatic slideshow for images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePreviousImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const toggleEventDetails = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 h-auto p-4 mt-[80px] lg:mt-[100px] ${
        isMobileView ? "w-[100%]" : "w-[65%]"
      }`}
    >
       {/* Slideshow Banner */}
       <section className="mb-12 shadow-black shadow-md rounded-lg">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease transform ${
                currentImage === index
                  ? "opacity-100 translate-x-0 z-20"
                  : "opacity-80 translate-x-full z-10"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Conditionally display text on the first image */}
              {currentImage === index && index === 0 && (
                <h1 className="absolute inset-0 bg-transparent flex items-center justify-center text-5xl font-bold text-white shadow-black drop-shadow-md">
                  Welcome to GAIL (India) Limited
                </h1>
              )}
            </div>
          ))}

          {/* Optional arrows for manual image navigation */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 z-30"
            onClick={handlePreviousImage}
          >
            ◀
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 z-30"
            onClick={handleNextImage}
          >
            ▶
          </button>
        </div>
      </section>

      {/* Projects and Initiatives */}
      <section className="mb-12 mt-1">
        <h2 className="text-3xl font-semibold mb-4">Our Key Projects</h2>
        <div className="flex space-x-6 overflow-x-scroll pb-4">
          {[
            {
              title: "Pipeline Infrastructure Expansion",
              date: "Ongoing",
              description:
                "GAIL's extensive pipeline projects ensure reliable gas supply across India, spanning over 13,000 km.",
            },
            {
              title: "Renewable Energy Initiatives",
              date: "2023 - 2025",
              description:
                "Focused on expanding renewable energy sources like solar and wind power to meet sustainability goals.",
            },
            {
              title: "Natural Gas Processing",
              date: "Completed: 2022",
              description:
                "Processing facilities efficiently convert raw natural gas into valuable products, ensuring optimal resource utilization.",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="min-w-[300px] p-6 shadow-gray-400 shadow-sm rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-500">{project.date}</p>
              <button
                onClick={() => toggleEventDetails(index)}
                className="text-blue-500 mt-2"
              >
                {expandedEvent === index ? "Hide Details" : "View Details"}
              </button>
              {expandedEvent === index && (
                <p className="mt-4 text-black">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* GAIL Highlights */}
      <section className="mb-12 mt-12">
        <h2 className="text-3xl font-semibold mb-4">Highlights of GAIL</h2>
        <p className="mb-4 text-lg">
          GAIL stands as a leader in India's energy sector, advancing in
          pipeline infrastructure, gas processing, and renewable energy.
        </p>
        <div className="flex space-x-6 overflow-x-scroll pb-8">
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://prd.kerala.gov.in/sites/default/files/2017-07/gail-gas-pipeline.png"
              alt="Pipeline Infrastructure"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Pipeline Network</h3>
            <p className="text-black">
              GAIL operates one of the largest gas pipeline networks in the
              country, ensuring energy accessibility.
            </p>
          </div>
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2021/08/GAIL-to-Expand-Renewables-Portfolio-Through-Mergers-and-Acquisitions.jpg"
              alt="Solar Power"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Solar Power Initiatives</h3>
            <p className="text-black">
              GAIL is dedicated to promoting clean energy through solar power
              projects across India.
            </p>
          </div>
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://news.fsu.edu/wp-content/uploads/2023/05/Innovation-Hub-34.jpg"
              alt="Innovation Hub"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Innovation Hub</h3>
            <p className="text-black">
              Supporting cutting-edge research and development in energy
              technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Efforts */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Sustainability Efforts</h2>
        <p className="mb-4">
          GAIL is committed to sustainable practices that minimize environmental impact.
          Our projects focus on reducing carbon emissions and enhancing renewable energy.
        </p>
        <ul className="list-disc ml-6">
          <li>Investing in renewable energy sources</li>
          <li>Promoting energy efficiency</li>
          <li>Implementing waste management strategies</li>
          <li>Engaging in biodiversity conservation</li>
        </ul>
      </section>

      {/* Corporate Social Responsibility (CSR) */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Corporate Social Responsibility (CSR)</h2>
        <p className="mb-4">
          GAIL is dedicated to contributing to the communities in which we operate. Our CSR initiatives focus on education, healthcare, and community development.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Key Initiatives</h3>
          <ul className="list-disc ml-6">
            <li>Providing scholarships for underprivileged students</li>
            <li>Health camps and medical assistance</li>
            <li>Community development programs</li>
          </ul>
        </div>
      </section>

  {/* <div className="flex flex-col transition-all duration-300 h-auto p-4 mt-4"> */}

      {/* Career Opportunities */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Career Opportunities</h2>
        <p className="mb-4">
          Join GAIL to be part of a dynamic and innovative team. We are constantly looking for talented individuals to drive our vision forward.
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Project Manager</li>
          <li>Environmental Engineer</li>
          <li>Data Analyst</li>
          <li>Safety Officer</li>
        </ul>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Explore Career Opportunities
        </button>
      </section>

      {/* Testimonials or Case Studies */}
     {/* Testimonials Section */}
     <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Testimonials</h2>
        <Slider {...testimonialSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border-l-4 border-blue-500">
              <blockquote className="italic mb-4">
                "{testimonial.text}"
              </blockquote>
              <footer className="font-semibold">- {testimonial.author}</footer>
            </div>
          ))}
        </Slider>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index}>
              <h3
                className="text-xl font-semibold cursor-pointer flex justify-between items-center p-2 bg-gray-50 border-gray-200 border-2 rounded-lg"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span>{faqOpen === index ? '-' : '+'}</span>
              </h3>
              {faqOpen === index && (
                <p className="ml-4 mt-2 text-black">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Google Map Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Locations</h2>
        <div className="w-full h-[400px] border-solid border-2 border-gray-400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7008.054141739634!2d77.17704843933252!3d28.56894980650772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d841aaaaaab%3A0x9b9b78f4b37f48f9!2sGAIL%20India%20Limited!5e0!3m2!1sen!2sin!4v1727435704827!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
