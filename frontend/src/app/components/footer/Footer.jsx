"use client";
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { CONTACT_INFO } from "../../../utils/SITE_INFO";
import { scroller } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "../../../lib/api";

function Footer({ footerData, services, industries }) {
  const officesCards = footerData?.officesCard || [];
  const { description, whiteLogo } = footerData;
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };

  const handleNavigation = (item) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      router.push("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className=" relative shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.8)]">
      <div className="absolute -top-[60px] left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  w-full    py-8 max-lg:px-5 container md:px-8  lg:mx-auto xl:py-8  mx-auto bg-transparent">
          {/* Logo and description */}
          <div className="flex flex-col justify-start  gap-4 mt-2">
            <Image
              src={getStrapiMedia(whiteLogo.url)}
              quality={100}
              width={240}
              height={100}
              onClick={() => router.push("/")}
              alt="Logo"
              style={{ objectFit: "contain" }}
              className="max-md:w-40  object-contain"
            />
            <p className="text-textColor w-5/6 font-poppins mt-4 text-base tracking-wide whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-items-heading text-primaryColor  mb-4 mt-4">
              Useful Links
            </p>
            <ul>
              <li className="text-textColor tracking-wider mb-2 cursor-pointer text-base">
                <button onClick={() => router.push("/about-us")}>
                  <span className="hover:text-primaryColor font-poppins duration-150">
                    About
                  </span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-2 cursor-pointer text-base">
                <button onClick={() => scrollToSection("why-choose-us")}>
                  <span className="hover:text-primaryColor font-poppins duration-150">
                    Why Choose Us
                  </span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-2 cursor-pointer text-base">
                <button onClick={() => scrollToSection("contact")}>
                  <span className="hover:text-primaryColor font-poppins duration-150">
                    Contact
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-items-heading text-primaryColor mb-4 mt-4">
              Insights
            </p>
            <ul>
              <li className="text-textColor tracking-wider mb-2 cursor-pointer text-base">
                <button onClick={() => router.push("/case-studies")}>
                  <span className="hover:text-primaryColor font-poppins duration-150">
                    Case Studies
                  </span>
                </button>
              </li>
              <li className="text-textColor tracking-wider mb-2 cursor-pointer text-base">
                <button onClick={() => scrollToSection("why-choose-us")}>
                  <span className="hover:text-primaryColor font-poppins duration-150">
                    News & Blogs
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="footer-items-heading text-primaryColor   mb-4 mt-4">
              Industries
            </p>
            <ul>
              {industries.map((industry, index) => (
                <li
                  onClick={() => handleNavigation("industries")}
                  key={index}
                  className="text-textColor w-fit group relative  tracking-wider mb-2 cursor-pointer font-poppins text-base"
                >
                  <span className="group-hover:text-primaryColor relative duration-300">
                    {industry.industryShortTitle}
                  </span>
                  <div className="absolute bottom-0 mt-2 left-0 right-0 h-[1px] bg-gradient-to-r from-secondaryColor to-primaryColor transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="footer-items-heading text-primaryColor  mb-4 mt-4">
              Services
            </p>
            <ul>
              {services.map((service, index) => (
                <li
                  onClick={() => handleNavigation("services")}
                  key={index}
                  className="text-textColor w-fit group relative  tracking-wider mb-2 cursor-pointer font-poppins text-base"
                >
                  <span className="group-hover:text-primaryColor relative duration-300">
                    {service.shortTitle}
                  </span>
                  <div className="absolute bottom-0 mt-2 left-0 right-0 h-[1px] bg-gradient-to-r from-secondaryColor to-primaryColor transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer 3rd section - Copyright */}
      <div className="bg-white">
        <div className=" mx-auto container px-5  md:px-8 lg:mx-auto">
          <div className="bg-primaryColor h-[0.25px]"></div>
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-primaryColor text-md font-poppins tracking-wide">
              Copyright © {new Date().getFullYear()}, Gigantech. All rights
              reserved.
            </p>
            <div className="flex flex-row gap-4 items-center mt-4 sm:mt-0">
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="border-[1px] border-primaryColor p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-primaryColor justify-center flex"
              >
                <MdEmail className="text-primaryColor text-[20px] group-hover:text-white" />
              </Link>
              <Link
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[1px] border-primaryColor p-2 rounded-full items-start group cursor-pointer transition-all ease-in-out duration-150 hover:bg-primaryColor justify-center flex"
              >
                <FaLinkedinIn className="text-primaryColor text-[20px] group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
