import React, { useRef, useEffect, useState } from "react";
import mosque from "../assets/image/mosque.png";
import { FaBookOpen } from "react-icons/fa";
import { GiFeather, GiCompass, GiTimeTrap } from "react-icons/gi";
import { Link } from "react-router-dom";

function Hero() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardRefs = useRef([]);

  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([]);

  useEffect(() => {
    const options = { threshold: 0.2 };

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTextVisible(true);
        } else {
          setTextVisible(false);
        }
      });
    }, options);

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
        } else {
          setImageVisible(false);
        }
      });
    }, options);

    const cardsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setCardsVisible((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        } else {
          setCardsVisible((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
          });
        }
      });
    }, options);

    if (textRef.current) textObserver.observe(textRef.current);
    if (imageRef.current) imageObserver.observe(imageRef.current);
    cardRefs.current.forEach((card) => {
      if (card) cardsObserver.observe(card);
    });

    return () => {
      if (textRef.current) textObserver.unobserve(textRef.current);
      if (imageRef.current) imageObserver.unobserve(imageRef.current);
      cardRefs.current.forEach((card) => {
        if (card) cardsObserver.unobserve(card);
      });
    };
  }, []);

  return (
    <section>
      <div className="flex md:flex-row flex-col lg:justify-between items-center md:gap-20 m-auto mt-30 w-[90%] overflow-x-hidden">
        {/* Text Section */}
        <div
          ref={textRef}
          className={`flex flex-col gap-5 justify-center transition-all duration-1000 ease-out ${
            textVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-20 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-7">
            <h1 className="font-bold text-[#004D40] text-4xl md:text-5xl text-center sm:text-start">
              Echoes of Madinah
            </h1>
            <p className="text-[#364153] text-lg text-center sm:text-start">
              Step into the legacy of the Prophet ﷺ and his companions. Read
              their
              <br className="hidden sm:block" /> stories. Reflect. Learn. Grow.
            </p>
          </div>

          <div className="flex justify-center sm:justify-start gap-4">
            <Link to='/seerah'>
            <button className="bg-[#004D40] hover:bg-[#00695C] px-6 py-3 rounded-lg text-white duration-700">
              Start Reading
            </button>
            </Link>
             
             <Link to='/quiz'>
            <button className="hover:bg-[#004D40] px-6 py-3 border border-[#004D40] rounded-lg text-[#004D40] hover:text-white duration-700">
              Take a Quiz
            </button>
             </Link>
          </div>
        </div>

        {/* Mosque Image */}
        <div
          ref={imageRef}
          className={`mt-10 lg:mt-0 transition-all duration-1000 ease-out ${
            imageVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-20 opacity-0"
          }`}
        >
          <img
            className="xl:mr-20 rounded-xl w-100 lg:w-95 h-90 lg:h-120"
            src={mosque}
            alt="Mosque"
          />
        </div>
      </div>

      {/* Offerings */}
      <div className="flex flex-col gap-10 mt-50">
        <h1 className="font-bold text-[#004D40] text-4xl text-center">
          Explore Our Offerings
        </h1>

        <div className="flex md:flex-row flex-col justify-center gap-17">
          {[
            {
              icon: <FaBookOpen className="w-10 h-10 text-[#004D40]" />,
              title: "Seerah",
              text: "Explore the lives of the Prophet ﷺ and companions.",
            },
            {
              icon: <GiFeather className="w-10 h-10 text-[#004D40]" />,
              title: "Quizzes",
              text: "Test your knowledge with engaging Islamic questions.",
            },
            {
              icon: <GiCompass className="w-10 h-10 text-[#004D40]" />,
              title: "Reflections",
              text: "Daily spiritual gems to nourish your soul.",
            },
            {
              icon: <GiTimeTrap className="w-10 h-10 text-[#004D40]" />,
              title: "Timeline",
              text: "Walk through the key events of early Islam.",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              data-index={i}
              className={`flex flex-col items-center text-center transition-all duration-700 ease-out delay-${
                i * 200
              } ${
                cardsVisible[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {item.icon}
              <h1 className="font-bold text-[#004D40] text-lg">{item.title}</h1>
              <p className="text-[#4A5565] text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
