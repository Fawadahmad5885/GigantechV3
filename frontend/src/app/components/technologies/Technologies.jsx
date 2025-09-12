"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { getStrapiMedia } from "../../../lib/api";
import { getCategoryImage, categoryImages } from "../../../utils/categoryImages";

function Technologies({ headerData, technologies }) {
  const techData = Array.isArray(technologies) ? technologies : [];

  const techGroups = techData.reduce((groups, tech) => {
    const category = tech?.category || "Uncategorized";
    if (!groups[category]) {
      groups[category] = {
        name: category,
        image: getCategoryImage(category),
        tools: [],
      };
    }
    groups[category].tools.push({
      name: tech.name,
      image: getStrapiMedia(tech.logo?.url) || "/default-tech-image.png",
      tooltip: tech.tooltip || tech.name,
    });
    return groups;
  }, {});

  // Define the preferred order of categories
  const categoryOrder = Object.keys(categoryImages);

  // Sort categories based on the defined order
  const categories = Object.values(techGroups).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.name);
    const indexB = categoryOrder.indexOf(b.name);

    return (
      (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) -
      (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB)
    );
  });

  const [selectedCategory, setSelectedCategory] = useState("Artificial Intelligence");

  // Set initial category if not set
  useEffect(() => {
    const hasAI = categories.some((c) => c.name === "Artificial Intelligence");
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(
        hasAI ? "Artificial Intelligence" : categories[0].name
      );
    }
  }, [categories]);

  const { title, description } = headerData;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Get current tools for selected category
  const currentTools = selectedCategory
    ? techGroups[selectedCategory]?.tools || []
    : [];

  if (!techData.length) {
    return (
      <div className="h-auto technologies-bg-image py-16 md:py-24  bg-tertiaryColor">
        <div className="px-[20px] font-poppins text-center">
          <h2 className="heading-text z-10 text-textColor">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        <p className="text-center py-8">
          No technologies available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="h-auto   relative my-[1px] py-16 md:py-24 bg-gradient-to-r from-white shadow-sm via-backgroundColor/50 to-backgroundColor">
      <div className="absolute top-0 left-0 h-full w-auto   opacity-20 pointer-events-none">
              <Image
                src="/background-logo.png"
                alt="Neural Network Background"
                width={800}
                height={800}
                className="h-full object-contain object-left"
              />
            </div>
      <div className="px-[20px] font-poppins text-center">
        <h2 className="heading-text z-10 text-textColor">{title}</h2>
        <p className="section-description">{description}</p>
      </div>

      {/* Mobile Dropdown */}
      <div className="relative md:hidden max-md:px-[20px]">
        <button
          onClick={toggleDropdown}
          className="border p-2 flex mt-4 items-center justify-between pr-4 rounded w-full bg-white text-left"
        >
          <span>{selectedCategory || "Select Category"}</span>
          <FaAngleDown className="text-[14px] text-[#696565]" />
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 bg-white left-0 right-0 mx-[20px] border rounded shadow-md mt-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => handleSelect(category.name)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden container mx-auto  md:flex flex-row flex-wrap justify-start xl:justify-between border-b-gray-300 border-b-2 mt-10 mb-10">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-2  z-10 py-3 flex flex-row items-center justify-center gap-2 text-base font-medium cursor-pointer ${
              category.name === selectedCategory
                ? " bg-white  text-textColor border-b-[3px] border-primaryColor"
                : "text-gray-600"
            }`}
          >
            {category.image && (
              <div className="w-9 h-9 flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={32}
                  height={32}
                  className={`object-contain transition-all duration-300 ${
                    category.name === selectedCategory
                      ? "filter-none"
                      : "filter grayscale opacity-80"
                  }`}
                />
              </div>
            )}
            <span className="font-medium  font-poppins">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Technology Swiper */}
      {currentTools.length > 0 && (
        <div className="container  max-lg:px-6 flex mx-auto flex-col mt-8 md:mt-16">
          <Swiper
            key={selectedCategory}
            spaceBetween={10}
            slidesPerGroup={3}
            breakpoints={{
              0: { slidesPerView: 4 },
              512: { slidesPerView: 4 },
              768: { slidesPerView: 6 },
              1024: { slidesPerView: 8 },
              1280: { slidesPerView: 12 },
            }}
            modules={[Grid, Pagination]}
            grid={{ rows: 2, fill: "row" }}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            className="w-full pb-4"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            {currentTools.map((tool) => (
              <SwiperSlide key={tool.name}>
                <Tippy content={tool.tooltip}>
                  <div className="flex flex-col items-center ">
                    <div className="flex items-center justify-center w-[80px] h-[80px]  rounded-lg shadow-md bg-white">
                      <Image
                        alt={tool.name}
                        width={80}
                        height={80}
                        src={tool.image}
                        className="w-[48px] h-[48px] object-contain"
                        onError={(e) => {
                          e.target.src = "/default-tech-image.png";
                        }}
                      />
                    </div>
                    <span className="text-[#3e3b3b] text-sm text-center h-[40px] flex items-center justify-center">
                      {tool.name}
                    </span>
                  </div>
                </Tippy>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination"></div>
        </div>
      )}
    </div>
  );
}

export default Technologies;
