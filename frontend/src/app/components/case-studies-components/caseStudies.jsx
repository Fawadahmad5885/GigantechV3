"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getStrapiMedia } from "../../../lib/api";
export default function CaseStudies({ headerData, cards }) {
  const [showAll, setShowAll] = useState(false);
  const [initialDisplayCount, setInitialDisplayCount] = useState(5);

  const sortedCards = [...(cards || [])].sort((a, b) => {
    // Handle cases where order might be undefined (fallback to 0)
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });

  const caseStudiesToDisplay = showAll
    ? sortedCards
    : sortedCards.slice(0, initialDisplayCount);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { title, description } = headerData;
  return (
    <section className=" py-16 md:py-24  mx-auto max-lg:px-5 bg-gradient-to-l from-white to-backgroundColor">
      <div className=" mx-auto">
        {/* Header Section - Left Aligned */}
        <div className=" mb-12 font-poppins ">
          <h2 className="heading-text text-center text-textColor   mb-4">
            {title}
          </h2>
          <p className="section-description text-center  text-gray-600 ">
            {description}
          </p>
        </div>
        <div className="mt-10 mx-auto container md:px-5 pb-24 rounded-lg relative">
          <Slider ref={sliderRef} {...settings}>
            {caseStudiesToDisplay.map((item) => (
              <div key={item.slug} className="md:px-3 h-full flex">
                <Link
                  data-aos="fade-up"
                  href={`/case-studies/${item.slug}`}
                  className="flex flex-col group border border-gray-300 shadow-sm transition-[transform] duration-500 ease-in-out overflow-hidden relative  h-full"
                >
                  {/* Image Section */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={
                        getStrapiMedia(item.image?.url) || "/placeholder.svg"
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-500 transform  bg-secondaryColor"
                    />
                    {/* <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-out"></div> */}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-6 flex-1 relative z-20">
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-10"></div>

                    <p className="text-primaryColor text-left mb-2 text-base font-medium relative z-20">
                      {item.category}
                    </p>

                    <h3 className="font-poppins font-semibold text-left mb-4 tracking-wide text-lg relative z-20 line-clamp-2 min-h-[3.5rem]">
                      {item.title}
                    </h3>

                    <p className="text-gray-700 text-left text-sm md:text-base line-clamp-3 font-normal mb-4 relative z-20">
                      {item.description}
                    </p>

                    <div className="inline-flex items-center text-primaryColor transition-colors duration-300 relative z-20 mt-auto">
                      <span className="text-base font-poppins tracking-wide font-medium">
                        Read Case Study
                      </span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          {/* Container for both arrows and view all link */}
          <div className="absolute bottom-4 w-full flex justify-between items-center md:px-4">
            {/* View All News link - centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                href="/case-studies"
                className="inline-flex items-center px-8 py-3 text-primaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
              >
                <span className="text-lg font-poppins tracking-wide font-medium ">
                  View All{" "}
                </span>
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Arrows - pushed to the right (original position) */}
            <div className="ml-auto right-0 justify-end md:px-6 container flex space-x-4">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="p-2  rounded-full bg-backgroundColor  hover:bg-primaryColor hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="p-2 rounded-full bg-backgroundColor hover:bg-primaryColor hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {!showAll && cards.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-8 py-3 text-primaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
            >
              <span className="text-lg font-poppins tracking-wide font-medium">
                View All{" "}
              </span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
