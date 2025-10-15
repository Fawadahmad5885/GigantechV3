"use client";
import { getStrapiMedia } from "../../../lib/api";
import Image from "next/image";

function ServicesCard({ service }) {
  const imageUrl = getStrapiMedia(service.image?.url);

  return (
    <div
  data-aos="fade-up"
  data-aos-anchor-placement="top-bottom"
  data-aos-duration="1000"
  className="group rounded-lg p-[30px] bg-white services-card hover:scale-105 transition-all duration-300 ease-in-out"
>
  {/* Flex container for icon + text */}
  <div className="flex items-start gap-4">
    {/* Icon / Image */}
    

    {/* Title + Subtitle */}
    <div className="flex flex-col gap-1">
      <h2 className="text-start font-poppins text-lg font-semibold text-primaryColor">
        {service.title}
      </h2>
      <p className="font-poppins text-base font-medium text-left text-black">{service.subtitle}</p>
    </div>
    <div className="flex-shrink-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center">
      <Image
        alt={service.title || "Service image"}
        src={imageUrl}
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  </div>

  {/* Description below both */}
  <p className="card-description  text-gray-600 mt-3">
    {service.description}
  </p>
</div>

  );
}

export default ServicesCard;
