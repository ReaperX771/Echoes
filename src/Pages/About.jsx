import React, { useEffect, useRef, useState } from 'react'
import { MdMosque } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { FaHandshakeAngle } from "react-icons/fa6";

function About() {
  const topRef = useRef(null);
  const cardsRef = useRef(null);

  const [topVisible, setTopVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === topRef.current) {
            setTopVisible(entry.isIntersecting);
          }
          if (entry.target === cardsRef.current) {
            setCardsVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (topRef.current) observer.observe(topRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className='py-30 bg-[#DDFCEC] pb-70'>
        <div className='flex flex-col gap-10 w-[95%] md:w-[70%] bg-white py-17 px-10 rounded-2xl m-auto'>

          {/* Heading + intro */}
          <div
            ref={topRef}
            className={`transition-all duration-1000 ease-out ${
              topVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-50"
            }`}
          >
            <div className='flex gap-2 items-center'>
              <MdMosque className='text-2xl md:text-3xl text-[#009966]' />
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>About Echoes of Madinah</h1>
            </div>
            <h1 className='text-[16px] sm:text-lg mt-4'>
              Echoes of Madinah is a digital platform designed to bring the beauty of Islamic knowledge to life through
              <br className='hidden sm:block' /> engaging Seerah stories, daily reflections, and beneficial resources.
            </h1>
          </div>

          {/* Cards wrapper (animates as a whole) */}
          <div
            ref={cardsRef}
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-2 w-[99%] m-auto transition-all duration-1000 ease-out ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-50"
            }`}
          >
            <div className='bg-[#DDFCEC] w-fit mt-5 rounded-2xl p-7 flex flex-col gap-5 h-full min-h-[100px]'>
              <IoBook className='text-3xl text-[#009966]' />
              <h1 className='font-semibold text-lg sm:text-xl'>Seerah Stories</h1>
              <p className='text-[16px]'>
                Learn from the life of Prophet Muhammad ﷺ in a
                <br className='hidden sm:block' /> beautifully presented format with PDFs and
                <br className='hidden sm:block' /> reflections.
              </p>
            </div>

            <div className='bg-[#DDFCEC] w-fit mt-5 rounded-2xl p-7 flex flex-col gap-5 h-full min-h-[100px]'>
              <FaHandshakeAngle className='text-3xl text-[#009966]' />
              <h1 className='font-semibold text-lg sm:text-xl'>Daily Reflections</h1>
              <p className='text-[16px]'>
                Gain insight and spiritual growth through carefully
                <br className='hidden sm:block' /> selected reflections posted every day.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
