import React, { useState } from 'react';
import logo from '../assets/image/logo.png';
import { FaBookOpen, FaBars, FaTimes } from "react-icons/fa";
import { GiFeather, GiCompass, GiTimeTrap } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <section className="bg-[#004D40] py-5 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="w-[95%] m-auto">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link className="flex items-center gap-3" to='/' onClick={() => setIsOpen(false)}>
                <img className="w-7" src={logo} alt="Logo" />
                <p className="text-2xl font-bold text-white">Echoes of Madinah</p>
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-5 text-white">
              <Link to='/seerah' className="flex hover:text-[#EFB337] duration-700 items-center gap-2">
                <FaBookOpen /><li>Seerah</li>
              </Link>

              <Link to='/quiz' className="flex hover:text-[#EFB337] duration-700 items-center gap-2">
                <GiFeather /><li>Quiz</li>
              </Link>

              <Link to='/reflection' className="flex hover:text-[#EFB337] duration-700 items-center gap-2">
                <GiCompass /><li>Reflections</li>
              </Link>

              <Link to='/timeline' className="flex hover:text-[#EFB337] duration-700 items-center gap-2">
                <GiTimeTrap /><li>Timeline</li>
              </Link>
            </ul>

            {/* Mobile Toggle */}
            <div
              className="md:hidden text-white hover:text-[#EFB337] duration-700 text-2xl cursor-pointer"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-4 text-white bg-[#003d33] p-5 rounded-lg">
              <Link to='/seerah' className="flex items-center hover:text-[#EFB337] duration-700 gap-2" onClick={toggleMenu}>
                <FaBookOpen /><span>Seerah</span>
              </Link>
              <Link to='/quiz' className="flex items-center hover:text-[#EFB337] duration-700 gap-2" onClick={toggleMenu}>
                <GiFeather /><span>Quiz</span>
              </Link>
              <Link to='/reflection' className="flex items-center hover:text-[#EFB337] duration-700 gap-2" onClick={toggleMenu}>
                <GiCompass /><span>Reflections</span>
              </Link>
              <Link to='/timeline' className="flex items-center hover:text-[#EFB337] duration-700 gap-2" onClick={toggleMenu}>
                <GiTimeTrap /><span>Timeline</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to push content below fixed navbar */}
      {/* <div className="h-[80px]"></div> */}
    </>
  );
}

export default Navbar;
