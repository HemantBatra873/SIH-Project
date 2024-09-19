import React, { useEffect, useState } from "react";

export default function Layout({ isChatBoxOpen }) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`flex flex-col transition-all duration-300 h-auto p-4 mt-[80px] lg:mt-[100px] ${
        isMobileView ? "w-[100%]" : "w-[65%]"
      }`}
    >
      {/* Museum Header */}
      <section className="mb-12">
        <div
          className="relative w-full h-[400px] bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3ZuRTTv_CdtRl6fWcFU2nekj2BAooq4BUw&s')`,
          }}
        >
          <div className="sm:text-3xl md:text-6xl font-bold text-white absolute bg-transparent">
            Welcome to the National Museum
          </div>
        </div>
      </section>

      {/* Museum History */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">History of the Museum</h2>
        <p className="mb-4 text-lg">
          The National Museum was established in 1901 and has become a symbol of
          historical preservation and education. Housing an array of collections
          from ancient civilizations, classical art, and modern masterpieces, it
          offers visitors a glimpse into the past while promoting the cultural
          heritage of our nation.
        </p>
        <img
          src="https://d1bb1mccaihlpl.cloudfront.net/variants/a99z44tk1y9yavefreyx92fksmsp/5495488087431af32265aaaaa1b8a274541d70555aa4d7c01d8d0fed27e7c152"
          alt="Museum Interior"
          className="rounded-lg shadow-md mb-6 mx-auto"
        />
      </section>

      {/* Featured Artifacts */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Featured Artifacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg p-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3ZuRTTv_CdtRl6fWcFU2nekj2BAooq4BUw&s"
              alt="Artifact 1"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Ancient Vase</h3>
            <p className="text-black">
              This vase dates back to 500 BC, representing early Greek art.
            </p>
          </div>
          <div className=" rounded-lg p-4">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Artifact 2"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Pharaoh's Mask</h3>
            <p className="text-black">
              A 14th-century BC mask from ancient Egypt used in royal burials.
            </p>
          </div>
          <div className=" rounded-lg p-4">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Artifact 3"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Renaissance Sculpture</h3>
            <p className="text-black">
              A stunning example of Renaissance art from the 16th century.
            </p>
          </div>
        </div>
      </section>

      {/* Museum News and Updates */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Latest News and Events</h2>
        <div className="space-y-6">
          <div className=" p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              New Exhibit Opening: Ancient Civilizations
            </h3>
            <p className="text-black">
              Explore the newest exhibit showcasing the wonders of ancient
              civilizations. This collection includes rare artifacts from
              Mesopotamia, Egypt, and beyond.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              Interactive History Tour - November 1st, 2024
            </h3>
            <p className="text-black">
              Join us for an interactive tour of the museum's latest
              collections, offering a unique educational experience with live
              demonstrations and expert guides.
            </p>
          </div>
        </div>
      </section>

      {/* Visitor Reviews */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Visitor Reviews</h2>
        <div className="flex space-x-6 overflow-x-scroll pb-4">
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "A truly immersive experience, the exhibits are breathtaking!" -
              Emily R.
            </p>
            <p className="text-gray-500 text-sm">Visited: August 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "One of the best museums I've been to! The interactive tours were
              engaging." - Michael T.
            </p>
            <p className="text-gray-500 text-sm">Visited: July 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-black text-sm">Visited: June 2024</p>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Museum Location</h2>
        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434907888!2d144.9581941158667!3d-37.81725457975107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218cce6e0!2sVictoria%20State%20Library%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1634353431354!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
