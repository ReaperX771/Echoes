import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Quote() {
  const quoteRef = useRef(null);
  const othersRef = useRef(null);
  const journeyRef = useRef(null);

  const [quoteVisible, setQuoteVisible] = useState(false);
  const [othersVisible, setOthersVisible] = useState(false);
  const [journeyVisible, setJourneyVisible] = useState(false);

  useEffect(() => {
    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const quoteObs = createObserver(quoteRef, setQuoteVisible);
    const othersObs = createObserver(othersRef, setOthersVisible);
    const journeyObs = createObserver(journeyRef, setJourneyVisible);

    return () => {
      if (quoteRef.current) quoteObs.unobserve(quoteRef.current);
      if (othersRef.current) othersObs.unobserve(othersRef.current);
      if (journeyRef.current) journeyObs.unobserve(journeyRef.current);
    };
  }, []);

  return (
    <section className="overflow-x-hidden">
      {/* Quotes of the Day */}
      <div
        ref={quoteRef}
        className={`bg-[#004D40] py-15 mb-20 mt-20 transform transition-all duration-700 ease-out ${
          quoteVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      >
        <div className='flex flex-col justify-center items-center gap-2 text-center'>
          <h1 className='text-white text-2xl font-bold'>Quotes of the Day</h1>
          <h1 className='text-white/90 text-xl italic mt-5'>
            “Indeed, in the Messenger of Allah you have an excellent example for whoever hopes in Allah and the Last Day, and remembers Allah often.”
          </h1>
          <p className='text-white/90 text-[16px]'>— Qur’an 33:21</p>
        </div>
      </div>

      {/* What Others Are Saying */}
      <div
        ref={othersRef}
        className={`mb-20 w-[90%] m-auto transform transition-all duration-700 ease-out ${
          othersVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        }`}
      >
        <h1 className='text-[#004D40] text-3xl font-bold text-center mb-10'>
          What others Are Saying
        </h1>
        <div className='flex flex-col lg:flex-row justify-center gap-7'>
          <div className='bg-[#F0FDFA] shadow flex flex-col gap-5 px-10 py-9 w-fit'>
            <h1 className='text-[#1E2939]'>
              “Echoes of Madinah has become part of my daily routine. The stories
              <br className='hidden sm:block' /> are moving and insightful.”
            </h1>
            <p className='text-[#004D40] font-bold'>— Hafsah A.</p>
          </div>
          <div className='bg-[#F0FDFA] shadow-md flex flex-col gap-5 px-10 py-9 w-fit'>
            <h1 className='text-[#1E2939]'>
              “The timeline feature helped me understand the Seerah like never
              <br className='hidden sm:block' /> before.”
            </h1>
            <p className='text-[#004D40] font-bold'>— Musa A.</p>
          </div>
        </div>
      </div>

      {/* Begin Your Journey Today */}
      <div
        ref={journeyRef}
        className={`bg-[#004D40] py-15 mb-20 mt-20 transform transition-all duration-700 ease-out ${
          journeyVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className='flex flex-col justify-center items-center gap-3 text-center'>
          <h1 className='text-white text-2xl md:text-3xl font-bold'>
            Begin Your Journey Today
          </h1>
          <h1 className='text-white/90 text-[16px] sm:text-lg'>
            Let the echoes of the past guide your present.
          </h1>
          <Link to='/seerah'>
          <p className='text-[#004D40] bg-white py-3 px-7 rounded-lg font-bold text-[16px] mt-5 hover:bg-[#FEF9C2] duration-700'>
            Explore the Seerah
          </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Quote;
