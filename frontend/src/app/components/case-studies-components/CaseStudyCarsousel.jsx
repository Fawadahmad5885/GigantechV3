"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";

function CaseStudyCarousel({ items }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "20%", // Show adjacent slides slightly
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "5%", // Adjust on smaller screens
        },
      },
    ],
  };

  if (!items || !items.length) return null;

  return (
    <div className="w-full px-2 md:px-10">
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className="">
            <div className="flex flex-col  bg-gray-100  overflow-hidden relative group">
              {/* Title Section */}
              <div className="text-center p-3 ">
                <h3 className="text-lg md:text-xl lg:text-2xl text-textColor lg:font-semibold">
                  {item.title}
                </h3>
              </div>

              {/* Image Section */}
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                {item.image && (
                  <Image
                    src={getStrapiMedia(item.image.url)}
                    alt={item.title || `Slide ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={index === 0}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Arrows */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="p-2 rounded-full bg-gray-200 hover:bg-primaryColor hover:text-white transition-colors"
          aria-label="Previous slide"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="p-2 rounded-full bg-gray-200 hover:bg-primaryColor hover:text-white transition-colors"
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
  );
}

export default CaseStudyCarousel;
