import React from "react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

function ContactUs() {
  return (
    <div className="h-auto pt-[2%] bg-primaryColor">
      <div className="max-md:px-[20px]">
        <div className="px-[20px] mx-3 text-center">
          {/* Container */}
          <div className="flex flex-col gap-3 md:flex-row md:max-w-[940px] xl:max-w-[1340px] mx-auto ">
            {/* Title with button container */}
            <div className="flex-1 flex flex-col items-start justify-start max-md:gap-3 my-auto  ">
              <h1 className="text-2xl md:text-3xl lg:text-[40px] text-white mb-[15px] text-left">
                Let’s Build Your Digital Success Story
              </h1>
              <button className="py-3 px-6  text-primaryColor rounded-md tracking-wider mr-auto  bg-white ">
                <span className="relative text-primaryColor   gap-2 flex items-center transition-colors duration-300">
                  Contact Us
                  <LiaLongArrowAltRightSolid className="text-2xl" />
                </span>
              </button>
            </div>
            {/* Description container*/}
            <div className=" md:flex-1 font-poppins md:my-auto">
              <p className="text-left pt-[5px] pb-[25px] w-full md:pl-[50px] text-white text-lg md:text-left max-md:mt-3">
                With decades of expertise and hundreds of future-ready solutions
                delivered globally, Smach Stack combines technical mastery and
                industry insights to turn complex challenges into growth.
                Partner with a team trusted by enterprises worldwide—where
                technology meets innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
