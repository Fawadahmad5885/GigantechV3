// app/components/case-studies-components/CaseStudyMain.jsx
"use client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Contact from "../../components/contact/Contact";
import { getStrapiMedia } from "../../../lib/api";
export default function CaseStudyMain({
  caseStudy,
  contactSectionHeader,
  contactForm,
}) {
  const attributes = caseStudy.attributes || caseStudy;
  const {
    title,
    category,
    image,
    content,
    description,
    aboutClient,
    technologiesCard,
  } = attributes;

  const getImageUrl = () => {
    if (!image) return "/fallback-image.jpg";

    // Handle different image data structures
    let imageUrl;

    if (image.url) {
      // Direct URL (Strapi v4 format)
      imageUrl = image.url;
    } else if (image.data?.attributes?.url) {
      imageUrl = image.data.attributes.url;
    } else if (typeof image === "string") {
      imageUrl = image;
    }

    if (imageUrl) {
      return getStrapiMedia(imageUrl);
    }

    return "/fallback-image.jpg";
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-gradient-to-r from-backgroundColor/10 via-backgroundColor/50 to-backgroundColor">
      <div className="   w-full  bg-cover  bg-center ">
        <div className="relative max-lg:pt-12 lg:pt-44 h-full lg:min-h-[80vh] 2xl:min-h-[70vh] px-5 inset-0 flex flex-col gap-6 xl:flex-row items-center justify-center lg:justify-between container mx-auto  text-textColor">
          {" "}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="text-start w-1/2 max-xl:mt-8 max-xl:w-full font-poppins"
          >
            <h3 className="text-secondaryColor text-lg font-poppins font-medium">
              {category}
            </h3>
            <h1 className="heading-text my-1">{title}</h1>
            {/* <p className="text-base tracking-wide font-poppins w-full text-start text-textColor mx-auto mb-4">
              {description || "Discover our case studies"}
            </p> */}
            {technologiesCard && technologiesCard.length > 0 && (
              <>
                <h3 className="text-secondaryColor mt-4 text-lg font-poppins font-medium">
                  Technologies
                </h3>
                <div className="flex flex-row gap-4 mt-2 items-center justify-start flex-wrap">
                  {technologiesCard.map((tech, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-1 p-2 "
                      title={tech.title}
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Image
                          width={40}
                          height={40}
                          src={getStrapiMedia(tech.image?.url)}
                          alt={tech.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = "/fallback-tech.png";
                          }}
                        />
                      </div>
                      <span className="text-xs text-textColor font-medium">
                        {tech.title}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="items-center w-full h-full  overflow-hidden md:flex-1 flex"
          >
            <Image
              src={imageUrl}
              alt={title || "Case Study Background"}
              width={800}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {/* Descripition */}
      {/* <div className="relative max-xl:mt-12">
        <div className="flex flex-col justify-center container  mx-auto items-start px-6 ">
          <h1 className="font-semibold text-xl lg:text-2xl xl:text-2xl text-secondaryColor">
            Client
          </h1>
          <p className=" prose md:w-1/2  w-full lg:w-1/3 text-gray-700 text-left text-sm md:text-base lg:text-lg whitespace-pre-wrap  mt-4 ">
            <i>{aboutClient}</i>
          </p>
        </div>
      </div> */}
      {/* Sections */}
      <div className="p-6 rounded-lg  mb-6  container  mx-auto">
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <Contact
        id="contact"
        headerData={contactSectionHeader}
        contactForm={contactForm}
      />
    </div>
  );
}
