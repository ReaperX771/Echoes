import React, { useEffect, useRef, useState } from 'react';
import { FaUserShield } from "react-icons/fa";

function Privacy() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); // reset so it replays when scrolled again
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="py-50 mb-50">
        <div
          ref={containerRef}
          className={`flex flex-col gap-7 w-[90%] md:w-[80%] bg-white py-10 shadow-lg px-5 rounded-2xl m-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className={`flex gap-3 items-center transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <FaUserShield className="text-2xl md:text-4xl text-[#4A5565]" />
            <h1 className="text-2xl md:text-4xl font-bold text-[#101828]">Privacy Policy</h1>
          </div>

          <div className={`text-[18px] text-[#101828] flex flex-col gap-5 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <h1>
              We value your privacy. Echoes of Madinah does not collect personal information unless you contact us directly. We
              <br className="hidden sm:block" /> do not track, store, or share your data with third parties.
            </h1>

            <h1>
              By using this website, you agree to our terms. If we make any changes to this policy, we will notify users on this page.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Privacy;
