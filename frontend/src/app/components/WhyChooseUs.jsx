"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "../../lib/api";
function WhyChooseUs({ aboutData }) {
  const { title, description, aboutImage } = aboutData;

  const router = useRouter();
  return (
     <div  className="h-auto relative py-16 md:py-24  shadow-sm bg-gradient-to-r from-white via-backgroundColor/50 to-backgroundColor" id="why-choose-us">
       <div className="absolute top-0 left-0  h-full w-auto  opacity-20 pointer-events-none">
              <Image
                src="/background-logo.png"
                alt="Neural Network Background"
                width={800}
                height={800}
                className="h-full max-md:hidden object-contain object-left animate-revealMask"
              />
            </div>
      <div className="max-md:px-[20px] ">
        <div className="md:px-[20px]  z-20 text-center">
          {/* Container */}
          <div className="flex flex-col gap-14 md:flex-row component-width   mx-auto ">
            {/* Image container */}
            <div data-aos="fade-right"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000" className="items-center w-full  overflow-hidden md:flex-1 flex">
              <Image
                src={getStrapiMedia(aboutImage.url)}
                width={1200}
                height={1200}
                alt="Smach Stack platform card background image representing innovation and technology solutions."
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded-lg"

              />
            </div>
            {/* Content Container */}
            <div data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000" className="flex-1 flex flex-col items-start">
              <h1 className="heading-text lg:leading-[48px] text-textColor text-left mt-0">
                {title}
              </h1>
              <p className="text-textColor my-[15px] text-justify text-lg">
                {description}
              </p>
              <button
                className="primaryButton px-8 py-1"
                onClick={() => router.push("/about-us")}
              >
                
                  {"Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
