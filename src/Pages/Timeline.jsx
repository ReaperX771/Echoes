import React, { useEffect, useRef, useState } from "react";

function Timeline() {
  const events = [
    { title: "Birth of the Prophet ﷺ", year: "570 CE", desc: "The Prophet Muhammad ﷺ was born in Mecca to the Hashim clan of the Quraysh tribe." },
    { title: "Death of Amina", year: "576 CE", desc: "The Prophet ﷺ loses his mother Amina at the age of 6, becoming an orphan." },
    { title: "Marriage to Khadijah (RA)", year: "595 CE", desc: "The Prophet ﷺ marries Khadijah (RA), a respected and wealthy businesswoman in Mecca." },
    { title: "First Revelation", year: "610 CE", desc: "The Angel Jibril (AS) appears to the Prophet ﷺ in the cave of Hira with the first revelation." },
    { title: "Public Call to Islam Begins", year: "613 CE", desc: "The Prophet ﷺ begins publicly calling people to Islam after years of private preaching." },
    { title: "Year of Sorrow", year: "619 CE", desc: "Both Khadijah (RA) and Abu Talib pass away. The Prophet ﷺ faces increased hostility in Mecca." },
    { title: "First Pledge of Aqabah", year: "621 CE", desc: "Delegates from Yathrib (Medina) pledge allegiance to the Prophet ﷺ and accept Islam." },
    { title: "Hijrah to Medina", year: "622 CE", desc: "The Prophet ﷺ migrates to Medina, marking the beginning of the Islamic calendar." },
    { title: "Battle of Badr", year: "624 CE", desc: "The Muslims, though outnumbered, achieve a decisive victory over the Quraysh." },
    { title: "Farewell Sermon and Passing", year: "632 CE", desc: "The Prophet ﷺ delivers his farewell sermon during Hajj and passes away later that year." }
  ];

  // Custom hook for intersection observer
  const useInView = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const node = ref.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setInView(entry.isIntersecting);
          });
        },
        { threshold: 0.2 }
      );
      if (node) observer.observe(node);
      return () => {
        if (node) observer.unobserve(node);
      };
    }, []);

    return [ref, inView];
  };

  // Timeline event card as a child component
  function TimelineEvent({ event, fromRight }) {
    const [ref, inView] = useInView();
    return (
      <div className="relative overflow-x-hidden" ref={ref}>
        {/* Circle */}
        <span
          className={`absolute -left-[9px] top-4 sm:top-5 lg:top-6 w-4 h-4 bg-[#004D40] rounded-full z-20 transform transition-all duration-700 ease-out
            ${
              inView
                ? "translate-x-0 translate-y-0 opacity-100"
                : fromRight
                ? "translate-x-12 opacity-0"
                : "-translate-y-12 opacity-0"
            }`}
        ></span>

        {/* Card */}
        <div
          className={`ml-7 mb-8 sm:mb-10 bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-lg gap-2 flex flex-col relative before:content-[""] before:absolute before:-left-[10px] before:top-4 before:sm:top-5 before:lg:top-6 before:w-[18px] before:h-[18px] before:bg-white before:rounded-full before:z-10 transform transition-all duration-700 ease-out
            ${
              inView
                ? "opacity-100 translate-x-0 translate-y-0"
                : fromRight
                ? "opacity-0 translate-x-76"
                : "opacity-0 -translate-y-56"
            }`}
        >
          <h1 className="text-[#004D40] font-bold text-xl sm:text-2xl">
            {event.title}
          </h1>
          <p className="text-[#6A7282] text-xs sm:text-sm">{event.year}</p>
          <p className="text-[#364153] text-base sm:text-lg">{event.desc}</p>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className="py-16 mt-20">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl mb-12 sm:mb-16 lg:mb-20 font-bold text-[#004D40]">
          Timeline of the Seerah
        </h1>

        <div className="border-l-4 w-[90%] sm:w-[80%] lg:w-[70%] mx-auto border-[#004D40]">
          {events.map((event, index) => {
            const fromRight = index % 2 === 0;
            return <TimelineEvent key={index} event={event} fromRight={fromRight} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
