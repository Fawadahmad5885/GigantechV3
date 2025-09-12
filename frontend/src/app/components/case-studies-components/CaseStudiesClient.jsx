"use client";
import Image from "next/image";
import { scroller } from "react-scroll";
import CardsSection from "./CardsSection";
import Contact from "../contact/Contact";
import { getStrapiMedia } from "../../../lib/api";

export default function CaseStudiesClient({
  heroSectionData,
  contactSectionHeader,
  contactForm,
  caseStudiesCards,
}) {
  const { title, description, image } = heroSectionData;
  const imageUrl = getStrapiMedia(image?.url);

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -90,
    });
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative bg-gradient-to-r from-backgroundColor/10  via-backgroundColor/50 to-backgroundColor  w-full   lg:h-[75vh] min-h-[70vh] bg-cover  bg-center bg-no-repeat">
        <div className="absolute md:px-5 inset-0 flex flex-row items-center justify-between container mx-auto  text-textColor max-lg:px-6 lg:mt-24">
          <div data-aos="fade-right"
              data-aos-duration="1000" className="text-start w-2/3 max-lg:w-full font-poppins">
          <h3 className="text-secondaryColor  text-lg lg:text-xl font-poppins font-medium">
                Case Studies
              </h3>
            <h1 className="heading-text ">
              {"Success Stories Across Industries"}
            </h1>
            <p className="lg:text-lg  tracking-wide font-poppins text-start text-textColor mx-auto mb-4">
              {description || "Discover our case studies"}
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="primaryButton max-lg:border-[1px]  w-fit mt-2 max-md:mb-10 px-4 lg:px-8 lg:py-1 tracking-wide"
            >
              {" "}
              Get Started
            </button>
          </div>
          <Image
            src={imageUrl}
            alt={title || "Case Study Background"}
            width={500}
            height={500}
            className="object-cover max-lg:hidden"
            data-aos="fade-left"
              data-aos-duration="1000"
          />
        </div>
      </div>
      <div id="cards-section">
        <CardsSection cards={caseStudiesCards} />
        <Contact
          id="contact"
          headerData={contactSectionHeader}
          contactForm={contactForm}
        />
      </div>
    </div>
  );
}
