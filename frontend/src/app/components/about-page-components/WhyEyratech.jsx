import React from "react";
import Image from "next/image";
import leadingImage from "../../../../public/assets/images/about-us-images/leading.png";
import clockImage from "../../../../public/assets/images/about-us-images/clock.png";
import groupImage from "../../../../public/assets/images/about-us-images/group.png";

const whyGigantechData = [
  {
    title: "Leading Top Talent",
    description:
      "We have handpicked the best and brightest professionals who are experts in their respective areas of expertise. Our team members are highly educated and experienced, and bring a wealth of knowledge and skills to every project.",
    image: leadingImage,
  },
  {
    title: "Time Zone Alignment",
    description:
      "We have team members strategically located in different time zones, which allows us to offer 24/7 support and services to our clients. This means that we can quickly respond to client requests, regardless of their location or the time of day.",
    image: clockImage,
  },
  {
    title: "Experienced Team",
    description:
      "With a decade long practical experience in their court, our senior engineers are not only certified in major technological degrees, they are also fluent in the English language. This particular feature along with extensive training under Techverx, proves to be an asset to take any technological project challenge heads on for clients and make them succeed.",
    image: groupImage,
  },
];

const bgColors = ["bg-blue-500", "bg-green-500", "bg-red-500"];

const WhyGigantech = () => {
  return (
    <div className="my-[5%] mx-3 text-center">
      <h2 className="text-2xl md:text-3xl  lg:text-[40px] text-textColor mb-[15px]">
        Why SmachStack
      </h2>
      <p className="text-lg text-textColor text-center max-md:text-justify lg:w-1/2 mx-auto">
        We only hire the best tech resources for our team that shorten
        development cycles while saving our clients over a million dollars a
        year.
      </p>
      {/* Card container */}
      <div className="grid grid-cols-1 w-full lg:max-w-[940px] xl:max-w-[1200px]  2xl:max-w-[1346px] lg:mx-auto md:grid-cols-3 gap-5 mt-10">
        {whyGigantechData.map((item, index) => (
          <div
            key={index}
            className={`relative h-[200px] lg:h-[300px] xl:h-[400px] rounded-lg overflow-hidden ${
              bgColors[index % bgColors.length]
            } p-6 flex items-center justify-center group`}
          >
            {/* Initial view: image and title */}
            <div className="flex flex-col  gap-4 items-center  z-10 mb-auto">
              <h2 className="text-white text-xl  font-bold">{item.title}</h2>
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                objectFit="cover"
                className="mt-4 lg:h-[180px] lg:w-[180px] xl:h-[260px] xl:w-[260px] "
              />
            </div>
            {/* Hover overlay: slides in from bottom with same bg color */}
            <div
              className={`absolute font-poppins inset-0 ${
                bgColors[index % bgColors.length]
              } z-20 flex flex-col items-center p-6  transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
            >
              <h2 className="text-white text-xl font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-base text-white  px-4 text-justify ">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-primaryColor mt-8 px-10 w-fit mx-auto py-4 text-14px leading-16 rounded-md text-white border border-primaryColor tracking-wider">
        Learn More
      </button>
    </div>
  );
};

export default WhyGigantech;
