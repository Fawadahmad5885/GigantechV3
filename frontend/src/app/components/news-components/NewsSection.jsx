"use client";
import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";

const NewsSection = ({
  headerData,
  data,
  showViewAll = true,
  hideHeader = false,
}) => {
  const sortedNews = (data || []).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const displayedNews = showViewAll
    ? sortedNews.slice(0, visibleCount)
    : sortedNews;

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
    ],
  };
  const { title, description } = headerData;

  return (
    <section className="h-auto shadow-md  bg-gradient-to-r from-white via-backgroundColor/50 to-backgroundColor relative mx-auto py-16 md:py-24 ">
      <div className="mx-auto px-4 sm:px-5 lg:px-8">
        {!hideHeader && (
          <div className=" font-poppins text-center">
            <h2 className="heading-text text-textColor">{title}</h2>
            <p className="section-description">{description}</p>
          </div>
        )}
        <div className="mt-10 mx-auto container md:px-5 pb-24 rounded-lg relative">
          <Slider ref={sliderRef} {...settings}>
            {displayedNews.map((item) => (
              <div key={item.id} className="sm:px-4">
                <NewsCard item={item} />
              </div>
            ))}
          </Slider>

          {/* Container for both arrows and view all link */}
          <div className="absolute bottom-4 w-full flex justify-between items-center md:px-6">
            {/* View All News link - centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              {showViewAll && (
                <Link
                  href="/news-and-blogs"
                  className="inline-flex items-center px-8 py-3 text-primaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
                >
                  <span className="text-lg font-poppins tracking-wide font-medium ">View All </span>
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
            </div>

            {/* Arrows - pushed to the right (original position) */}
            <div className="ml-auto right-0 justify-end md:px-5 container flex space-x-4">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="p-2  rounded-full bg-backgroundColor shadow-sm  hover:bg-primaryColor hover:text-white transition-colors"
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
                className="p-2 rounded-full bg-backgroundColor shadow-sm hover:bg-primaryColor hover:text-white transition-colors"
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
      </div>
    </section>
  );
};

export default NewsSection;
