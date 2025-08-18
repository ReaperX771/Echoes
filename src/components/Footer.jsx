import React, { useEffect } from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();

  // 👇 This runs ONLY when a footer link is clicked,
  // because Footer re-renders while active in your layout
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <section>
      <div className='bg-[#004D40] py-10'>
        <div className='flex flex-col md:flex-row gap-27 w-[90%] mx-auto '>
          <div className='flex flex-col gap-3'>
            <h1 className='text-xl text-white font-bold'>Echoes of Madinah</h1>
            <p className='text-[16px]  text-white'>
              A place to explore the rich legacy of the
              <br className='hidden sm:block' /> Prophet ﷺ and his companions. Reflect,
              <br className='hidden sm:block' />learn, and grow spiritually.
            </p>
          </div>

          <div className='flex gap-7 sm:gap-30 lg:gap-60'>
            <div>
              <h1 className='text-xl text-white mb-3'>Explore</h1>
              <Link to='/seerah'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Seerah</p>
              </Link>
              <Link to='/quiz'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Quiz</p>
              </Link>
              <Link to='/reflection'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Reflections</p>
              </Link>
              <Link to='/timeline'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Timeline</p>
              </Link>
            </div>

            <div >
              <h1 className='text-xl text-white mb-3'>Resources</h1>
              <Link to='/about'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>About us</p>
              </Link>
              <Link to='/support'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Support</p>
              </Link>
              <Link to='/privacy'>
                <p className='text-[16px] hover:text-[#EFB337] duration-700 cursor-pointer text-white'>Privacy Policy</p>
              </Link>
            </div>

            <div className='flex flex-col gap-3'>
              <h1 className='text-xl text-white'>Connect</h1>
              <div className='flex gap-3'>
                              <a href='https://www.instagram.com/accounts/login/'>      
                <FaInstagram className='text-white w-5 h-5 cursor-pointer  hover:text-[#EFB337] duration-700' />
                              </a>
                              
                              <a href=''>
                <FaXTwitter className='text-white w-5 h-5 hover:text-[#EFB337] duration-700'/>
                              </a>

                              <a href=''>          
                <FaEnvelope className='text-white w-5 h-5 hover:text-[#EFB337] duration-700'/>
                              </a>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-white/20 mt-14'>
          <p className='text-[16px] mt-7 text-center text-white'>
            © 2025 Echoes of Madinah. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Footer
