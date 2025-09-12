"use client";
import React from "react";
import OurStory from "./OurStory";
import Contact from "../contact/Contact";
import PartnerChoice from "./PartnerChoice";
import { scroller } from "react-scroll";
import CustomButton from "./CustomButton";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { getStrapiMedia } from "../../../lib/api";
function AboutUsClient({
  aboutHeroData,
  partnerChoiceData,
  aboutStory,
  contactSectionHeader,
  footerSteps,
  contactForm,
}) {
  const { heading, aboutHeroCard, description } = aboutHeroData;
  console.log(heading);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -100,
    });
  };

  return (
    <div className="relative">
      {/* content container  */}
      <div className=" font-poppins  text-start flex flex-col gap-4">
        <div className=" pt-12 lg:pt-36 pb-10 h-full lg:min-h-[100vh]  w-[100vw] bg-gradient-to-r from-backgroundColor/10 shadow-sm my-[1px] via-backgroundColor/50 to-backgroundColor relative overflow-hidden ">
          <div className="absolute inset-0 w-full h-full pointer-events-none z-5 max-xl:hidden opacity-30">
            <Image
              src="/about-page-bg.png"
              alt="AI Background"
              fill
              className="object-cover object-right animate-revealMask"
              quality={100}
            />
          </div>

          <div className="container mx-auto flex justify-start flex-col md:flex-row items-center h-full pt-20 px-5 md:px-8 relative z-20">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="text-secondaryColor text-xl font-poppins font-medium">
                About Us
              </h3>
              <h1 className="heading-text ">{heading}</h1>
              <p className="text-lg tracking-wide font-poppins text-start text-textColor mx-auto mb-4">
                <ReactMarkdown>{description}</ReactMarkdown>
              </p>
              {/* Dynamic Cards */}
              <div className="flex mt-6 flex-col md:flex-row md:flex-wrap gap-4 lg:gap-6 xl:gap-8 xl:w-full">
                {aboutHeroCard?.map((card, index) => (
                  <div
                    key={card.id}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={index * 150}
                    className="relative flex group flex-col bg-white services-card p-8 gap-4 flex-1 min-w-[280px] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 h-full w-auto  opacity-20 pointer-events-none">
                      <Image
                        src="/background-logo.png"
                        alt="Neural Network Background"
                        width={400}
                        height={800}
                        className="h-full object-contain object-right"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-4 mb-4 relative z-10">
                      <Image
                        width={70}
                        height={70}
                        src={getStrapiMedia(card.image?.url)}
                        alt={card.title}
                        className="object-contain"
                      />
                      <h3 className="font-poppins text-lg font-medium">
                        {card.title}
                      </h3>
                    </div>

                    <div className="border-l-[2px] mb-auto border-primaryColor pl-4 relative z-10">
                      <p className="text-gray-700 font-poppins text-justify text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="primaryButton w-fit mt-8 max-md:mb-10 px-8 py-1 tracking-wider"
              >
                {" "}
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <OurClients /> */}
      <PartnerChoice sectionData={partnerChoiceData} />
      <OurStory storyContent={aboutStory} />
      <Contact
        headerData={contactSectionHeader}
        steps={footerSteps}
        contactForm={contactForm}
      />
    </div>
  );
}

export default AboutUsClient;
