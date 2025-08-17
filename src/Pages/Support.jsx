import React, { useEffect, useRef, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

function Support() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); // reset so animation triggers again
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="py-30 bg-[#e8f2fe] pb-90">
        <div
          ref={containerRef}
          className={`flex flex-col gap-7 w-[90%] md:w-[60%] bg-white py-10 shadow-lg px-5 rounded-2xl m-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className={`flex gap-3 items-center transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <FaPhoneAlt className="text-2xl md:text-4xl text-[#155DFC]" />
            <h1 className="text-2xl md:text-4xl font-bold text-[#101828]">Need Help?</h1>
          </div>

          <h1 className={`text-[18px] text-[#101828] transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            If you’re facing issues or have questions, reach out to us via the methods below:
          </h1>

          <div className="flex flex-col gap-5">
            <div className={`flex gap-3 items-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <FaEnvelope className="text-2xl text-[#155DFC]" />
              <div className="flex items-center gap-1 text-lg text-[#101828]">
                <p>Email:</p>
                <p className="cursor-pointer">control0177@gmail.com</p>
              </div>
            </div>

            <div className={`flex gap-3 items-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <FaWhatsapp className="text-2xl text-[#57b27f]" />
              <div className="flex items-center gap-1 text-lg text-[#101828]">
                <p>WhatsApp:</p>
                <p className="cursor-pointer">+2347025137714</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Support;
