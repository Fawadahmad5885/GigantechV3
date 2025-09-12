"use client";
import React, { useEffect, useState } from "react";
import CaseStudyCard from "./CaseStudyCard";
import { ArrowRight } from "lucide-react";

const CardsSection = ({ cards }) => {
  const [showAll, setShowAll] = useState(false);
  const [initialDisplayCount, setInitialDisplayCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInitialDisplayCount(7);
      } else {
        setInitialDisplayCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedCards = [...(cards || [])].sort((a, b) => {
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    return orderA - orderB;
  });

  const caseStudiesToDisplay = showAll
    ? sortedCards
    : sortedCards.slice(0, initialDisplayCount);
    console.log(caseStudiesToDisplay);
    

  return (
    <div className="h-auto pb-[5%]  bg-gradient-to-r from-white via-backgroundColor/50 to-backgroundColor" >
      <div className="container md:px-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-lg:px-5 gap-6 ">
          {caseStudiesToDisplay.map((item) => (
            <div
              key={item.slug}
            >
              <CaseStudyCard
                img={item.image}
                title={item.title}
                category={item.category}
                desc={item.description}
                CardButton={item.CardButton}
                slug={item.slug}
                className="flex flex-col h-full" 
              />
            </div>
          ))}
        </div>
        {!showAll && cards.length > initialDisplayCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-8 py-3 text-textColor hover:text-secondaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
            >
              <span>View All </span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsSection;
