import React, { useState, useEffect } from "react";

export default function Layout({ isChatBoxOpen }) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "../public/img/2024-02-23.jpg",
    "../public/img/IMG_20220914_155241.jpg",
    "../public/img/PXL_20230313_082829229.PORTRAIT.jpg",
  ];

  // Preload all images to avoid flickering
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  // Effect to automatically change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  // Functions for manual image navigation
  const handlePreviousImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };
  // State to handle event section expansion
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Function to toggle event expansion
  const toggleEventDetails = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 h-auto p-4 mt-[80px] lg:mt-[100px] ${
        isChatBoxOpen ? "w-[65%]" : "w-[100%]"
      }`}
    >
             {/* Slideshow Banner */}
      <section className="mb-12">
        <div className="relative w-full h-[400px] bg-center bg-cover bg-no-repeat">
          {/* Background image for slideshow */}
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          ></div>
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-black">
              Welcome to the National Museum
            </h1>
          </div>

          {/* Optional arrows for manual image navigation */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2"
            onClick={handlePreviousImage}
          >
            ◀
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2"
            onClick={handleNextImage}
          >
            ▶
          </button>
        </div>
      </section>


      {/* Events Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
        <div className="flex space-x-6 overflow-x-scroll pb-4">
          {[
            {
              title: "Art and History Workshop",
              date: "October 15, 2024",
              description:
                "Join us for a day-long workshop that combines art history with hands-on activities.",
            },
            {
              title: "Science Exhibit: Mars Rover",
              date: "October 22, 2024",
              description:
                "Explore the latest innovations in space exploration with a focus on Mars rovers.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
            {
              title: "Annual Museum Gala",
              date: "November 5, 2024",
              description:
                "Our annual gala event where art lovers meet to celebrate museum achievements.",
            },
          ].map((event, index) => (
            <div key={index} className="min-w-[300px] p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-500">{event.date}</p>
              <button
                onClick={() => toggleEventDetails(index)}
                className="text-blue-500 mt-2"
              >
                {expandedEvent === index ? "Hide Details" : "Expand Details"}
              </button>
              {expandedEvent === index && (
                <p className="mt-4 text-black">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

{/* Museum Highlights */}
<section className="mb-12">
  <h2 className="text-3xl font-semibold mb-4">Museum Highlights</h2>
  <p className="mb-4 text-lg">
    The museum offers a wide array of collections from various civilizations along with modern interactive displays.
  </p>
  {/* Container for swipeable horizontal scroll */}
  <div className="flex space-x-6 overflow-x-scroll pb-4">
    {/* Individual highlight items */}
    <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src="https://via.placeholder.com/400x300"
        alt="Highlight 1"
        className="rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">Interactive Space Exhibit</h3>
      <p className="text-black">Explore the final frontier with interactive models and displays.</p>
    </div>
    <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src="https://via.placeholder.com/400x300"
        alt="Highlight 2"
        className="rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">Ancient Civilizations</h3>
      <p className="text-black">Artifacts and exhibitions from ancient cultures around the world.</p>
    </div>
    <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src="https://via.placeholder.com/400x300"
        alt="Highlight 3"
        className="rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">Digital Art Installations</h3>
      <p className="text-black">Modern digital displays showcasing the future of art and design.</p>
    </div>
    <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src="https://via.placeholder.com/400x300"
        alt="Highlight 4"
        className="rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">Ancient Sculpture</h3>
      <p className="text-black">Masterpieces from the Renaissance period.</p>
    </div>
    <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src="https://via.placeholder.com/400x300"
        alt="Highlight 5"
        className="rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">Virtual Reality Experience</h3>
      <p className="text-black">Step into ancient history with VR technology.</p>
    </div>
  </div>
</section>


      {/* Museum Facilities */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Museum Facilities</h2>
        <p className="mb-4 text-lg">
          Our museum is equipped with state-of-the-art facilities to enhance your visit.
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">Cafeteria with various food options</li>
          <li className="mb-2">Free Wi-Fi throughout the museum</li>
          <li className="mb-2">Gift shop with exclusive museum merchandise</li>
          <li className="mb-2">Accessibility features for disabled visitors</li>
        </ul>
      </section>

      {/* Featured Artifacts (Upgraded) */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Featured Artifacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Artifact 1"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Ancient Vase</h3>
            <p className="text-black">
              This vase dates back to 500 BC, representing early Greek art.
            </p>
          </div>
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
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
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
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
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
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
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
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
          <div className="rounded-lg p-4 shadow-lg hover:scale-105 transition-all duration-300">
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
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              New Exhibit Opening: Ancient Civilizations
            </h3>
            <p className="text-black">
              Explore the newest exhibit showcasing the wonders of ancient civilizations. This collection includes rare artifacts from Mesopotamia, Egypt, and beyond.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              Interactive History Tour - November 1st, 2024
            </h3>
            <p className="text-black">
              Join us for an interactive tour of the museum's latest collections, offering a unique educational experience with live demonstrations and expert guides.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              Interactive History Tour - November 1st, 2024
            </h3>
            <p className="text-black">
              Join us for an interactive tour of the museum's latest collections, offering a unique educational experience with live demonstrations and expert guides.
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
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md rounded-lg">
            <p className="italic mb-2">
              "Incredible artifacts, especially the Ancient Egypt section!" -
              Sarah W.
            </p>
            <p className="text-gray-500 text-sm">Visited: June 2024</p>
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
