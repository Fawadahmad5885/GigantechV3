// "use client";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";
import ReactMarkdown from "react-markdown";

function IndustriesCard({ img, title, subtitle, desc }) {
  const imageUrl = img ? getStrapiMedia(img) : "/fallback-image.jpg";
  // const backgroundImageUrl = img.src || img;
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1000"
      className="max-md:w-full flex flex-col items-center bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 group  hover:bg-gradient-to-br hover:from-white/30 hover:via-white/20 hover:to-white/10 transition-all duration-500 rounded-lg services-card relative overflow-hidden"
    >
      <div className=" rounded-[5px] flex flex-col items-center">
        <div>
          <div>
            {/* Image Container with Zoom Effect */}
            <div className="pb-[25px] flex w-full items-center">
              <div className="w-full shadow-sm overflow-hidden">
                <Image
                  src={imageUrl}
                  width={500}
                  height={300}
                  alt={title}
                  style={{ objectFit: "cover" }}
                  className="w-full h-auto  transition-transform duration-500 group-hover:scale-105 rounded-t-md"
                />
              </div>
            </div>
            <div className=" p-4 text-center font-poppins mb-5">
              {/* Heading */}
              <h4 className="text-primaryColor font-semibold text-center leading-10 font-poppins text-lg">
                {title}
              </h4>
              <h5 className="text-te font-medium text-left leading-10 poppins-font text-base">
                {subtitle}
              </h5>
              {/* Short Description */}
              <div className="card-description font-normal ">
                {/* <ReactMarkdown> */}
                  {desc}
                  {/* </ReactMarkdown> */}
                
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustriesCard;
