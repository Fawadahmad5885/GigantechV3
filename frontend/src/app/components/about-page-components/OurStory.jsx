import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const OurStory = ({ storyContent }) => {
  const { heading, firstParagraph, secondParagraph } = storyContent;

  return (
    <div
      className="relative py-[5%] bg-gradient-to-r shadow-md from-white via-backgroundColor/50 to-backgroundColor"
      id="why-choose-us"
    >
      <div className="absolute top-0 right-0 h-full w-auto  opacity-20 pointer-events-none">
        <Image
          src="/background-logo.png"
          alt="Neural Network Background"
          width={800}
          height={800}
          className="h-full max-md:hidden object-contain object-right animate-revealMask"
        />
      </div>
      <div className="max-md:px-[20px]">
        <div className="container max-lg:w-full mx-auto md:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="w-full lg:w-1/2 flex items-center   shadow-md rounded-lg"
            >
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/about-us-1.png"
                  fill
                  alt="Company story image"
                  quality={100}
                  className="object-cover"
                />
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="w-full lg:w-1/2 p-6 px-0 lg:px-8 py-0  rounded-lg flex flex-col justify-center"
            >
              <h1 className="heading-text text-textColor mb-6">{heading}</h1>
              <p className="text-textColor font-poppins  mb-4 md:text-lg">
                <ReactMarkdown>{firstParagraph}</ReactMarkdown>
              </p>
              <p className="text-textColor font-poppins  md:text-lg">
                {secondParagraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
