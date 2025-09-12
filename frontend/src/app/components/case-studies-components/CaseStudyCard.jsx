import { getStrapiMedia } from "../../../lib/api";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CaseStudyCard = ({
  img,
  title,
  category,
  desc,
  CardButton,
  slug,
  className,
}) => {
  const imageUrl = img?.data?.attributes?.url
    ? getStrapiMedia(img.data.attributes.url)
    : img?.url
    ? getStrapiMedia(img.url)
    : "/fallback-image.jpg";

  return (
    <Link
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000"
      key={slug}
      href={`/case-studies/${slug}`}
      className={`flex flex-col group services-card border-gray-300 border-[1px] transition-[box-shadow,transform] duration-500 ease-in-out overflow-hidden relative ${className}`}
    >
      <div className="overflow-hidden relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          width={500}
          height={300}
          alt={title}
          style={{ objectFit: "cover" }}
          className="object-cover w-full h-full transition-all duration-500 transform  bg-secondaryColor"
        />
       
      </div>

      <div
        className={`flex max-sm:bg-gray-100 flex-col p-6 flex-grow relative z-20`}
      >
        <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out z-10"></div>

        <div className="flex flex-row justify-between items-center relative z-20">
          <p className="text-secondaryColor medium text-left mb-2 text-base font-medium">
            {category}
          </p>
        </div>
        <h3 className="text-gray-700 font-semibold text-left mb-4 font-sans text-lg relative z-20">
          {title}
        </h3>

        <p className="text-gray-700 text-left text-sm md:text-base lg:text-lg line-clamp-3 font-normal mb-4 flex-grow relative z-20">
          {desc}
        </p>

        <div className="inline-flex items-center text-gray-900 group-hover:text-secondaryColor rounded-lg transition-colors duration-300 relative z-20">
          <span>Read more</span>
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
