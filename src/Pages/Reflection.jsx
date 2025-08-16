import React, { useEffect, useRef, useState } from 'react';

function Reflection() {
  const titleRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const [visible, setVisible] = useState({
    title: false,
    card1: false,
    card2: false,
    card3: false,
  });

  useEffect(() => {
    const refs = [
      { key: 'title', ref: titleRef },
      { key: 'card1', ref: card1Ref },
      { key: 'card2', ref: card2Ref },
      { key: 'card3', ref: card3Ref },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const refKey = refs.find((r) => r.ref.current === entry.target)?.key;
          if (refKey) {
            if (entry.isIntersecting) {
              setVisible((prev) => ({ ...prev, [refKey]: true }));
            } else {
              setVisible((prev) => ({ ...prev, [refKey]: false }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <section>
      <div className='py-50  bg-[#666666] overflow-x-hidden'>
        <div className='flex flex-col gap-10'>
          <h1
            ref={titleRef}
            className={`text-white text-4xl font-bold text-center transform transition-all mb-15 duration-700 ${
              visible.title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Daily Reflections
          </h1>

          <div className='grid gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 w-[99%] m-auto'>
            <div
              ref={card1Ref}
              className={`bg-white text-[#101828] text-lg rounded-2xl p-7 flex flex-col justify-between h-full min-h-[200px] transition-all duration-700 ${
                visible.card1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h1>
                Sincerity (Ikhlas) is the soul of every action.
                <br className='hidden sm:block' /> Without it, even a good deed loses its
                <br className='hidden sm:block' /> weight.
              </h1>
              <p className='text-[#009966] text-sm'>Surah Al-Bayyinah: 5</p>
            </div>

            <div
              ref={card2Ref}
              className={`bg-white text-[#101828] text-lg rounded-2xl p-7 flex flex-col justify-between h-full min-h-[200px] transition-all duration-700 ${
                visible.card2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h1>
                In every hardship, there’s a divine lesson.
                <br className='hidden sm:block' /> Allah doesn’t burden a soul beyond what it
                <br className='hidden sm:block' /> can bear.
              </h1>
              <p className='text-[#009966] text-sm'>Surah Al-Baqarah: 286</p>
            </div>

            <div
              ref={card3Ref}
              className={`bg-white text-[#101828] text-lg rounded-2xl p-7 flex flex-col justify-between h-full min-h-[200px] sm:col-span-2 sm:max-w-[50%] sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0 transition-all duration-700 ${
                visible.card3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h1>
                Gratitude beautifies the heart. Shukr attracts
                <br className='hidden sm:block' /> more blessings.
              </h1>
              <p className='text-[#009966] text-sm'>Surah Ibrahim: 7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reflection;
