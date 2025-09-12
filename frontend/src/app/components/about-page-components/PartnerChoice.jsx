import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";

function PartnerChoice(sectionData) {
  const { heading, partnerChoiceCard } = sectionData.sectionData || {};

  return (
    <div
      className="relative bg-gradient-to-l  from-white to-backgroundColor py-[5%]  w-full "
      id="why-choose-us"
    >
      {/* <div className="absolute top-0 left-0 h-full w-auto   opacity-20 pointer-events-none">
        <Image
          src="/neural-shape-right.png"
          alt="Neural Network Background"
          width={400}
          height={800}
          className="h-full object-contain object-left"
        />
      </div> */}
      <div>
        <h2 className="heading-text max-md:px-5  text-center text-textColor">
          {heading}
        </h2>
        {/* Cards container with 20px gap */}
        <div className="card-container container md:px-8   mt-8">
          {partnerChoiceCard?.map((item, index) => (
            <div
            data-aos="fade-up"
              data-aos-duration="1000"
              key={index}
              className="flex flex-col bg-white p-8  z-10 gap-4 border-gray-300 border-[1px] flex-1 min-w-[280px]"
            >
              {/* Image with title */}
              <div className="flex flex-row items-center gap-4  mb-4">
                <Image
                  width={70}
                  height={70}
                  objectFit="contain"
                  src={getStrapiMedia(item.image?.url)}
                  alt={item.title}
                />
                <h3 className="font-poppins text-lg font-medium  ">
                  {item.title}
                </h3>
              </div>
              {/* Red line with description */}
              <div
                className="border-l-[2px] mb-auto  border-primaryColor pl-4  
              "
              >
                <p className="text-gray-700 font-poppins text-justify text-base ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnerChoice;
