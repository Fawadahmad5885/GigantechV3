"use client";
import React, { useState, useEffect } from "react";
// import { IndustriesData } from "@/data/industries-data/IndustriesData";
import IndustriesCard from "./IndustriesCard";

function Industries({ headerData }) {
  const [showAll, setShowAll] = useState(false);
  const [initialDisplayCount, setInitialDisplayCount] = useState(3);
  const { title, description } = headerData;
  const industryCards = headerData?.industryCard || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInitialDisplayCount(6);
      } else {
        setInitialDisplayCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const industriesToDisplay = showAll
    ? industryCards
    : industryCards.slice(0, initialDisplayCount);

  return (
    <div className="h-auto  py-16 md:py-24  shadow-md bg-gradient-to-r from-white via-backgroundColor/50 to-backgroundColor" id="industries">
      <div className="">
        <div className="px-5 md:px-[50px] font-poppins  text-center">
          <h2 className="heading-text text-textColor  ">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        <div className="mt-10 container md:px-8 card-container">
          {industriesToDisplay.map((item) => (
            <IndustriesCard
              key={item.id}
              img={item.image?.formats?.medium?.url}
              title={item.title}
              subtitle={item.subtitle}
              desc={item.description}
            />
          ))}
        </div>
        {industriesToDisplay.length > initialDisplayCount && !showAll && (
          <div className="w-full flex items-center my-5 justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative text-primaryColor transition-colors duration-300 group"
            >
              {"View More"}
              <span className="absolute bottom-0 left-0  h-[0.5px] bg-primaryColor transition-all duration-300 w-full"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Industries;
