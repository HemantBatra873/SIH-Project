import React, { useState, useEffect } from "react";

export default function Layout({ isChatBoxOpen }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);
  const images = [
    "/img/2560px-National_Science_Centre_Delhi_19920109-228.jpg",
    "/img/5.jpg",
    "/img/800px-Indian_Science_and_Technology_Heritage_Gallery_-_National_Science_Centre_-_New_Delhi_2014-05-06_0822-0826_Compress.jpg",
    "/img/lossy-page1-1200px-Pamulaparti_Venkata_Narasimha_Rao_Unveiling_Inaugural_Plaque_-_National_Science_Centre_-_New_Delhi_1992-01-09_262.tif.jpg",
  ];

  // Preload all images to avoid flickering
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        isMobileView ? "w-[100%]" : "w-[65%]"
      }`}
    >
      {/* Slideshow Banner */}
      <section className="mb-12 shadow-black shadow-md rounded-lg">
        <div className="relative w-full h-[400px] rounded-lg bg-center bg-cover bg-no-repeat">
          {/* Background image for slideshow */}
          <div
            className="w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          ></div>

          {/* Conditionally display the text on the first image */}
          {currentImage === 0 && (
            <h1 className="absolute inset-0 bg-transparent flex items-center justify-center text-5xl font-bold text-white ">
              Welcome to the National Museum
            </h1>
          )}

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
      <section className="mb-1 mt-1 ">
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
          ].map((event, index) => (
            <div
              key={index}
              className="min-w-[300px] p-6  shadow-gray-400 shadow-sm rounded-lg"
            >
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
      <section className="mb-12 mt-12">
        <h2 className="text-3xl font-semibold mb-4">Museum Highlights</h2>
        <p className="mb-4 text-lg">
          The museum offers a wide array of collections from various
          civilizations along with modern interactive displays.
        </p>
        {/* Container for swipeable horizontal scroll */}
        <div className="flex space-x-6 overflow-x-scroll pb-8">
          {/* Individual highlight items */}
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://c8.alamy.com/comp/BE556B/uk-england-yorkshire-keighley-cliffe-castle-museum-music-room-natural-BE556B.jpg"
              alt="Highlight 1"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Interactive Space Exhibit</h3>
            <p className="text-black">
              Explore the final frontier with interactive models and displays.
            </p>
          </div>
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg  hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTY80z0jrQELkkltrsAEJkP0zCwxOmOl1zw&s"
              alt="Highlight 2"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Ancient Civilizations</h3>
            <p className="text-black">
              Artifacts and exhibitions from ancient cultures around the world.
            </p>
          </div>
          <div className="min-w-[300px] rounded-lg p-4 shadow-lg  hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAw-61Kb0VtDK-1Lt6HP0RXcmFAexWD0Zrw&s"
              alt="Highlight 3"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Digital Art Installations</h3>
            <p className="text-black">
              Modern digital displays showcasing the future of art and design.
            </p>
          </div>
        </div>
      </section>

      {/* Museum Facilities */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Museum Facilities</h2>
        <p className="mb-4 text-lg">
          Our museum is equipped with state-of-the-art facilities to enhance
          your visit.
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
          <div className="rounded-lg p-4 shadow-lg  hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIVFhUXFRcVFxgXFxcXGBgWGBcXFxcXFxcaHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFysdHRkrLS0tKysrLS0tKystLS0tKy0rKystKysrLS8tLS0tLS0tLSstLC0rLzctLS0tLCstN//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xABHEAABAwICBgcFBQYEBAcAAAABAAIRAyEEMQUSQVFhcQYTIoGRobEyUnLB0RRCkrLwIzNTYoLhFUOi8QdjwtIWJVRkg5Oz/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAjEQEBAQEAAgIBBAMAAAAAAAAAARECEiEDMVEEEzJBFCJC/9oADAMBAAIRAxEAPwDhWDPu9FIqG08h8/onBXNpm472zyHotagbN5D0WRjx2u4LSwzuw34R6IOcxQ7Th/M71Kg1T0iP2j/jd6lDhaZSlLWUUkDykkE8IEEk8J4QMFNqGXgKevuEoCJw1QaXExEczu5IraJObvAfNMD6vFRc9ozKOygwZyeZ+kI/2trB2WtadYGzGzY5zC1OU1lPqgkEbCitrvdkBbao4yvrFue3zQ6FUiRxTxXRSHkkF242vnP0S6obz4x6IT6hk92SG4HbKuAxDRuUH1AglqSgJ1so1RtgqjVeOSlFZOnKSgjCdOkgYJykEigYBJIJIOmAueQ9T9U8opF/JNqhY1vGTpL2h8PzKvYN3Yby+qr47DkkERlvR8N2WAOsd0jeqjE0uP2j/i9YKBCt6apHXcZ9239IVBjZ8FuMpkhSbfIE8hKJggBJO8Aef0WzSoEiYKuDD1SM2xs71OnRcWl1oE+SvY1nZdwqDzaD80fQgGo6RMF1u5JEVf8ADt5PkkME3dPMn0Xo+ndJaOrYdgoYM06sN7WvYWvIvr+RXJOw4WsTWIKQDhAAsdnEfVCoN7bebh/pK134btt+F/qxZVO1Ro/5keJhZWJVG9pvf6Kas1qHaZzI/wBLj8k5w6qKT3Kk4k3WjXaBuPeqpZG24IPgZVFdwuFYwNMEmd6HiDOrz/WxHot1dvks77VfoMbrVLZFkfhVarSbvUBUIJO/PusEnmU8omKldtzG+EJzIzV8IVb2m/repu1pUa3v5Aq47JWaIzVZy13MSVXKSkEzgsKQSKQSQMExTpkCBSSSQdZKjrLIdpJ4zAKkNK72+axjetMorMllN0m3aHeR+at4fFtItPgT6KYaoadYBMbmn0WXhxfuK0tO15MDIsE5zMn6BZdPfK6z6YrRwBaGF0Eu12gC2qWkP1idsyGjvPBd4/prRfhBQOj6Ie1ob1rRe33th1u9eah5G0+KYnetamNbSGKY5rwIkvaY2nstBPkVDRWOYxrw6butAm2qB9Vlpwpquhw2mKTWNB1iQ1oIA2gCbkjamPSBgypuPMhvpKwE4U8kxs4jpASG6lFrHDWBcXF8h0bIAEavFZReSdbbOta15mUNTCmqJ1rsy5x7zbluTSmSlBIJJDkkgDVzHNWVXrbOas6pQRUiUgxPqKLhAJEKQamLQhiJUHhGCi4IYqgKRYUSE8oYrahS6o70ZyaUMD6ril1aJKYlAPUSUpCdBo6TwhByPgqDqZGw+BXT6Ub6j1CoqS+l6jDZmtPRuTuYTYwW71HRx9ru+aqQLTQu34T5E/VZtPJammDZv9Xy+qy2OgKxEoTwm6wb0jVCB4Thqh1oUhUQS1VINTKzhcMX3yaDBdG2x1RvdBHKROYkB0KDnmGtLjw2cScgOJstfD6DETUeB/Ky573Gw8CiUqga3VbZszG8ja7eUSnXE3NlcBqOjaA/y54lzvTLyVkYKj/CZ5z6qOlcVR1ooF+rAu+A4mO1YGAJmEDDV9s8d6uMrT9A0i3W1HNB2tJO/wB62xZOO0IWnsPDhsB7J+novS+jfSbCUqLm1qQcXCAbAxlcbBbyXJ6bq0i4mmYGY8jG8ZhLySuExbSHAGxBuDmEc1m+8FrVqLKoh4uMiMxyPyWdR0ESXSdto2j5LNyNz2AcSz3gm+2M3q9htAh1RzO0dWfyscPzLVo9FGe645bTtWL1I1Oa5s45vFDdjhuK7Sl0TZ/DO3M7gq1Xo40YqnTFMCaL3xO4gTnxUncPGuSOOOwKwHki67fS/Rrq6Fd/VsGqxxkZ2YTa64bYtc9anUwwdnOwSoHEj3fP+yfY7l8wq60yMa493zKlSqy4CBcgb1XRsGP2jPiHqglUrEOIAbYkZbionEu3+QUK/tO+I+pUQgJ1rvePiUkOUlR2+PZZZjrLWxhseSyq5XLmuvari/ZP62oGANzyR8QeyVWwJ7R5fMLTmbTXss5u9B9FkFa+mf3bfj/6T9FkbFufSJsdwCk4zsChRRNVUDDbqYUdbgnClFihT1iBs2ncN60X1gAALAWA/W0rOZWgIbq5SC4cVuTCuVQ61MaiovnFcUbC6QLTG/blBggGxyusnWU235bSg2KOPLiG1DAkydsjYd3HkjVcc0mwMTtucoEDICALcFi13gukHO+zM8lEPRMbH2mLgqxh8eQeG1YbaiMKiK6XA4qsK1RzabSTBvUt7FLbqmbR4rboVsYQdWlQvqi9R262VPgsTorhGYgua51QOa2ezUcyWyBfVOezw3Lt8L0MouAJNY9oD9/Wyj4+K5dSNysZr8Za1Bpk7ajvoqFanivtlOX0Q/qahBDH6urLZBBfJOV5XX0+guFmXB5mc6tQ5X2u4Ll9M9F6H2+lQ6ssYaD3mHuuQ4AGZnepJCo6ddiuora2IpluodZraOqXCCCJLzGZC4XYu30/0Yw2GY4tYJNOuQXEuOsKDy2NYm8gERtC4Za5+manSpOdLWiSRYDmFYp6AxJyovMXMNJgTEmBa5HirvRUTiG935mr0itTc7DVw1+oSyn2pI/zqZIkXuAVL1lxZzseTN0PVJjVvuvPhCt4PQddr2uNMwDOTvourwWjzTc0uqMIBJMBxJsRGXLwWpQxbHGIdb+Vxm05AWS9NziPPqnR2uJc4QJ2ztPJNR6PVHZQV2On6plgaXAQZ9pu0QbxKp6Ie7rGklxBBt2jNtwV25qeM1hjopX3en1TLuuuG5/4Kn/aks+Va8I5rE1LFZlZxKsVHoNMSBfYnMxO/atWPZPIqrgj2+4q7WbYjgfRZ+E9sd/otuQul/3fJzT5OHzWNsW9pH907u9QsIBagnhxmjubwKbAYrqy7sMfrMcztCdXWjtN3PEWPNWKmNe9lNriIY0tbYWBc55uM7uJv6AKjPOfephQddSClBQ6FGrSsDIvmBsuRfjae8JVEehRLgQOBAkSYBsBnlJ7uIQVQy0n/cqJE3HeP1yWhjsE5hAcI7DCORaCbcy7vnaqhpkE3FhJvwuOJ2JKtgDTdTqvy5fooz8MYmJEWIGYEguyiJBvx4GItbrGYAAAnOBA9THiTlsqHYNZttmzj8pnyQQUanIcbSeHPMJGiXOMCe1q2vc5DigGHIjHKTsG8EjUdIcGEQZDzIDSPesbZ2KgaZa4tNiDBG4jNB0fQ57m4hpBsQWnk7L/AFaq9q0bRlgBAjWGz+VeL9FKf7Vjvutc17zYAMa5pc5xOQABklet0ekuDAj7Xhs/49LYPjXPr21PTbp4QR7I+9sC4rT7P/N6A/8AaPy+NdNhOk2DETjcLl/6ijt/rXH6f0pQfpag+nWpOaMO4azajHtBmQCWkwVM9Gn/AOIFKKZH8lfbuw9Q/JeVL0fp9pam8BratNzj10ta8EwcLWbJAyuR5Lzcpx/FK2eidPWrhsuEiJaS0i4NiLjJepaF0c1jKrg+qTDB26tRwu6fZJjYvM+g4nFM5H0JXreBpv6qr1bdYzTsTG13BZ6/k3z9M+vSRGYdoLCAASJJAAk6oF96lVwOLP8AlNH4j9EJ9PFCJptsNzuW9Rti9KsOTUZAfGo67WuN5yMBU+jWGcKrZDxDHTrNcAMgMwuk6zExakPB/qJRGGvHbY1p46wEX2lXy9YeNSLAnVR9auD+5Hi7/tSUayvNHFPSy8vNT6tNSbHifUrbihVGf62LLww7Tf1sWzUFgVkUD2m81qM1Z0h+6fyH5gsCV0WIbLHDh8wfksf7EdhCsRWabo1Q28VMYNwUThnK6AgpAon2Z25N1LtyCerMLRwtDK95tHkqIMNFr/r+ytYGos1eV/GgvA1okSSb6ziQ0S4km8MblHebrNc2DIWxmLLLxkjYFnmt9QFzdgAvMHIRt5G3JV2xESAn60jd/fYVA1j+ifqukcx6cEm4252EWjwgeKhScW3GwyOewoYr39lvh+h5Jw/KTbdnO8nmqC1KxcSZMkzmTJ7ryiNpg/EM7G/0juQadSSJzB2ABaOGw5InaIkRYzN/JZ6qyNfBVBRw2IdtfRNIf/I5rT4CT3LnBVd7x8Sr+l8VDGsG0ye7/dZOupzPS9fY5xDveKZuIcNvkPogayUrWMjOqEmTHgB6BJC1kRpUHTf8P2TjGD4v/wA3n5L3voPT7VXkz1cvDf8Ahpo91fHU6TKnVOcHkP1Q/Vim8nskgGcu9e/9GOj1XCueX4o1g5oEdU1kEGQZBO824rPjb1K1vrG+WDcEtUbgpJLoygaTfdHgExoN90eARElMi7VJ+i6RMlgSVyUk8Z+F8uvy+VgAhDbzP1WyNCVCPab5+v8AZAdoKsJgNN5s7gN8LmrOq5BY7bPHxfNdBX0ZWGdN3cJ9Fg1WFrrjJ2223crGavvEgiNaxtlNslnPpjbQeOUlaDK4Bm54BSfjXEHVpgDeST+XJWIyv2W+o3wRabGnKuRzlWK2NqGxceQGqO7aqbozMeZVwWHsLf8APaeTZ9AVBld+0t8FSq4r3R4/RV3VnHaVcHQvwfWYepVNSk0UyBqlwD3FwMBrZkiWwTskFYdB8FCCRCitnD4rervSTHYao2l1NI03NpgVCXTrvGbgNgysuaFUhM6qp4+2vL0d5QiU5KZbYSA2pi6f15JgU4O5AfCvAIK6bSWnBVAPV06YDWNhg1R2BGsd7jJJK5YPP+6vYCTLs4Ib/KHOBIBOyQx0W2FYs32suNHAsw1YnXDpAz1g3dcDW4laLejmGdk+qLxYtI4fdKyKNFxe4dW1xi4sdg3jl4rptG9E9fD1MSaIDKZaHapAIJ5XOYy3ppmqg6GUXDs16ne1p+QVWp0O/ammK+TQ4ks3xudxWgNIBghrnARAaAL8ACFm4vFvqlxcYkQd7gBAkjPllzzW5LWueL0zcVoimwkNxdB0TtLd224OfkhUtGGf3tKN4dreQuqdY9opoRh23RKpUweJZXpOpVC2RLtcWcIcA3I2Ji+1eyaO6eioL0njj+zI/PK+cdF6O618ey0Xc75DiV6VoMhrNRgsCB3Qs301HrtDpRTd91/cxzvygo46RUtpLfiZUZ+ZoXlZ0sGVgwGernW2zUgtMfCCW8y/YQugw3SIHMxxy9SmmR2x6Q0P4tP8bR80x09SPsvaeIMrlvt4d94Ot94yFSq9S4kOo0jb7zGm/eE0yOvOmhxSXCPwVCf3FH8DPokpiuAqaZObWOje46rfHJVXadxBs0tHwguPiZaqWq0mziYtkCR5yEWlimtJF/AfT5pn4OfH/o1WpXqe1UeeBdA/CLIVLRh2kDu+swrP+Jj3Uw0iziP1wWb5PRz+yOzRTdUzexzkrGAIjVe8f1E+q326SZq+1JI5lYlEeq6fp+b1brteeOskSIqR7QPxNB9IQnHYaVM8pb6Aqy91lXcbr0d/HIz38HChUwAmwcB3H53UDgB74HNrh5kQtqkVNxBXLxT/ABebPtiM0aT7L2O5OBPgF0OO6HNZgaeJ+0MNR7y00QO00Ce1M5WGzaFn1aDSckEsIs0uA4Ej0K59RwvxYyKmEePulBLCuipvqjKof6g1/wCYFG/xGoM2UXfFTj0PySWOd+PqOWMptZdU3SFP72EZ/Q6D4ao9VI1cK4Xp1mdwd83ei0z438OU1kpK6b/DsI7Ku1p/5jC0+J1Uv/DYd+7fTfxa/wDQRHNALR0fhCDrOECDbaZHlv7lot0JUpGeqceNneiLVDjLqg1bm5sSTeAMyUEqGLczWDXEBwh0E9obA73u9WG6Sqapaw2Jk56tuG0+ipNpSJNhu+v0RaLhdWfHP7er4vhtvsAnMkknjc96hSce1yR6rqZA1Q7WvrTEHdEKoXZxkutzmOnWcMuqDJU8PSc92qLbycgN5WhhMD1jtUFreLjAA2klW8LSDR2SQdvFcNeO82e/yVIljQ0QAO8k7zxWtofSb2S9riIs3cX7DxDR2uYaD7SpjWIve+3PzUWmAABYC3qTzPpA2JWWlgq5Du76LZw+LdrAQLrjqzXOIAkdoX4bVv6PcCRctMjObcQdqix1Yxpta43Ot580328SZZY8G5jbNjtQAdd0Q4nfrbczIz81UxDdUntCZuPXdKKsvxjZyKSynPO53l9UkVy7mg5gKJpDYSOEyPAqJckXqMIFh3tPMEflt5INRu8EciHfRWdZQeFdAhHvDvlvrCncbLcMvFJp2J+qbnEHeJHorLgia6gHSiPpneT8QDu6c/NQIj7g/pcR5OB9Vrzt+63Pk6/I7KimeCqmBnI+JpjxbrJMpk+yQ74XAn8PteSeTtP1PU+xy5BeQSg1S5phwIO4gg+BTdYVmzU/f37i/TahVpUGYkjMBO/EtO8LnJddP3OLPtAFTpngha4RWLtycXaO+mDnuVCthmzkFoFyqYgLWOvfMsNTq1G3bVqN5OMeGSO8ueQ57i4gZmLcAAAAqzeatNfBVkcueJojh2eCLRcC2NUAiZN5PNExFVhYIbBi95nysqQrSCNnqr11j09dTi/f9Am8x4pUKMmJA5ouEwxqODGxJMCVf0pod+FqupVo12xIabCQHC/IhcdvTxWXPO/SbsLqFzWvFVrY7XstmLxwmRO2JQazIvBHGxHdKrCi2fbjdIUsTRe1oMyDtCOFu3R8Owudqk9mL8v7/VXDgtzz33T4GnqNgi5uef8AZWaYDnACJJA3KWouaH0XrBziASAWtmwLs/p4pDR2IBk0QSNrHD0k+i28PhmAABxsNhz4q5TpHY/0Ky0wWV3sOs6nUaZzzjvIFu9CxWkGPMucQ7O7N4jNpkrqK1V7CJbI33HyhQFRtUSaQcJIuAbj1zTyVxjnsJnrm94f9Ey6p2BobcO3/wCsfRJXUxwmI0GR7DweDreYmfJZ1fC1Ge0wgb8x4iy7t+jHE2dPP6hV6+FczNvMjJTTHCNrInWLpK2j6bydZg7gQfJZz9At+69w5gH0hXUxlzdGa5EfoeqMgHx7pv3gx81Tc4tMOBB3GR5IizmolqgKim2oqJubuQqjAcwDzCJrJEIBscWiGveBuDiW/hNkzamwtpuHI0z40yB4gopiEJwTRHUYcxVZfZqVRHLsEeaHUw7b6tWm7gSaR7+tDRPIlGBRHEHO/O6aKdXCVGiXMcG+9Et/ELeaC1x2FXW0dUyyWOjNji0xukFNU1jcuDvjaCfxiHeaugLMS4ceaarW1uHK6kWb6Z5sdP8ApdJPiFBzWfxIO57XNPiJb4kLWt/udfkjzVkCwuh06Bz1dYb2kOH+mVEQforOmp8tizXqSABkhMQwYXQ9FtNtwlQvdSZVaWuYWklp7QIkEc1nNvtvnuddf7XGJTMXRXVdYEulzjtOxFGq4kl0Gchl3KIowJmxyKtklsnuOXfW3JfSsRA1pMfNXtGlzr3LR334evgqtZhttiAOeQWzhWhrQ0HLzO0rNYFFXfZa+hqIJNQxAsMsztv4d6zG3IG0rpKWGYGhsAwOR4lYqwenTZuA8lfwlAHKD3j+ypUsI0ZNI81qYWgwRrtdG2LHulFGNDcHDfE/NDrT910jkFpjD4eJbiKlMWHaZN9xLY4qjj6ZabPY/iI+iozS9+7yKSRxJ90ef1SUVFwtAsf1e6HqAG+fP1vZW8PgSYPsg7XSrzMAxsGA48cv14rJay/sfWCBTHxZHxzKA/o02JDnE+LeUi4XQvIPtNn08VF7jsdPDZ+LP15IzrmKmjXgQACNzdnoVnYjDscNV1OdkRYfMLteqBMkSR4D9cUWtSa8QQHcIn/ZWI8vxWgqJyBB/lMR42WZiNAvE6jpG4iD4ix8l6ditBsdvZuDe0O8HtfJZlfQdRokQ4bmmT4Z9wV0eZ1cLUZ7TDzF/MJmVV3eIoGYe2DuiDy3rPxOiKb7uaB5HxEFXRzAehkrWxPR8iSxxA/mE+Yy8Fl1sHUb92RvbcfVBAqYKrCqiMqKiy50qBUdcJSgkCkY3JgVEuQRdhW5xG4iyn2/4hPB4D/W4SBTgoIOcdtIHixxHk6Um1af3i5vxNPq2fRHUHnYros4ek13slrrbCCfDPyQ6tXUMXad1/mqrsMw5gd1lNtN4s2q4DKCdYXtkU0XME2TrbMhz2n5LT1QVTPZbEWCPSq60AC5sJ/WSg0tGaNDyX6xEWG2+Zse7xWx1VUZOB4KGFawNDWvBgbDmcyfGVZBhZUsPUdImx4LpND6QxDT+z7XAgH+5WJR2c5+S0sDTLjYi3GLqq2KtGm6oKtfRsvbPbp623fq2O3MqnpDF4V37ttSnvm9+8laNHHYqnJBJGZs13jt2LK0tiTWdLwNbgIKWkUy6n7480lTdgnbwko06Gjd3ioVPbaNhz4806SyzVqqcuaq4wREWSSRlOtZlrW2KvibNaRY7xY+KZJWixQ9mdpzVYZOO2c9qdJA1NgcDrAOjeJ2DeuSxftEcT6pJKioT6qvpEWHMJJIMvHUmlhJaCYNyAT4rmWpJKgwKl/ZJJUKbJiUklATZ3p25pJKibktySSBBEb93mPUJJKDXepYNo1xb7rvkkkixYcL9yt4CoZzPikklbdAxXsGc+aZJRKv0nHef0Uzj6JJKsqxTpJKK//Z"
              alt="Artifact 1"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Ancient Vase</h3>
            <p className="text-black">
              This vase dates back to 500 BC, representing early Greek art.
            </p>
          </div>
          <div className="rounded-lg p-4 shadow-lg  hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="data:image/jpeg;base64,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"
              alt="Artifact 2"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Pharaoh's Mask</h3>
            <p className="text-black">
              A 14th-century BC mask from ancient Egypt used in royal burials.
            </p>
          </div>
          <div className="rounded-lg p-4 shadow-lg  hover:shadow-gray-500 hover:scale-105 transition-all duration-300">
            <img
              src="img/v-glry-4.jpg"
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
        <h2 className="text-3xl font-semibold  mb-4">Latest News and Events</h2>
        <div className="space-y-6">
          <div className="p-6 rounded-lg shadow-gray-400 shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              New Exhibit Opening: Ancient Civilizations
            </h3>
            <p className="text-black">
              Explore the newest exhibit showcasing the wonders of ancient
              civilizations. This collection includes rare artifacts from
              Mesopotamia, Egypt, and beyond.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-gray-400 shadow-md">
            <h3 className="text-2xl font-semibold mb-2">
              Interactive History Tour - November 1st, 2024
            </h3>
            <p className="text-black">
              Join us for an interactive tour of the museum's latest
              collections, offering a unique educational experience with live
              demonstrations and expert guides.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-gray-400 shadow-md">
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
        <h2 className="text-3xl font-semibold mb-8">Visitor Reviews</h2>
        <div className="flex space-x-6 overflow-x-scroll pb-4">
          <div className="min-w-[300px] p-6 shadow-md shadow-gray-400 rounded-lg">
            <p className="italic mb-2">
              "A truly immersive experience, the exhibits are breathtaking!" -
              Emily R.
            </p>
            <p className="text-gray-500 text-sm">Visited: August 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md shadow-gray-400 rounded-lg">
            <p className="italic mb-2">
              "One of the best museums I've been to! The interactive tours were
              engaging." - Michael T.
            </p>
            <p className="text-gray-500 text-sm">Visited: July 2024</p>
          </div>
          <div className="min-w-[300px] p-6 shadow-md shadow-gray-400 rounded-lg">
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
        <div className="w-full h-[400px] border-solid border-2 border-gray-400">
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
