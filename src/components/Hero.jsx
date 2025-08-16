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
      <div className="flex w-[90%] overflow-x-hidden m-auto mt-30 items-center md:gap-20 lg:justify-between flex-col md:flex-row">
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
            <h1 className="text-4xl font-bold text-[#004D40] md:text-5xl text-center sm:text-start">
              Echoes of Madinah
            </h1>
            <p className="text-[#364153] text-lg text-center sm:text-start">
              Step into the legacy of the Prophet ﷺ and his companions. Read
              their
              <br className="hidden sm:block" /> stories. Reflect. Learn. Grow.
            </p>
          </div>

          <div className="flex gap-4 justify-center sm:justify-start">
            <Link to='/seerah'>
            <button className="px-6 text-white bg-[#004D40] rounded-lg hover:bg-[#00695C] py-3 duration-700">
              Start Reading
            </button>
            </Link>

            <button className="px-6 text-[#004D40] border border-[#004D40] rounded-lg hover:bg-[#004D40] hover:text-white duration-700 py-3">
              Take a Quiz
            </button>
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
            className="w-100 lg:w-95 h-90 lg:h-120 rounded-xl xl:mr-20"
            src={mosque}
            alt="Mosque"
          />
        </div>
      </div>

      {/* Offerings */}
      <div className="flex flex-col gap-10 mt-50">
        <h1 className="text-4xl font-bold text-[#004D40] text-center">
          Explore Our Offerings
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-17">
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
              <h1 className="text-[#004D40] text-lg font-bold">{item.title}</h1>
              <p className="text-sm text-[#4A5565]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
