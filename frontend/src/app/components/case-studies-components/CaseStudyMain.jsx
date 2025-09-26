// app/components/case-studies-components/CaseStudyMain.jsx
"use client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
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
    <div className=" bg-gradient-to-r from-backgroundColor/10  via-backgroundColor/50 to-backgroundColor">
      <section className="relative w-full bg-gradient-to-r from-backgroundColor/10 via-secondaryColor/50 to-backgroundColor  xl:h-screen 2xl:h-[90vh] ">
        {/* bg-gradient-to-l from-backgroundColor/10  via-backgroundColor/50 to-backgroundColor */}
        {/* background image */}
        {/* <Image
    src={imageUrl}
    alt={title || "Case Study Background"}
    fill            // makes it cover the parent
    priority        // loads immediately
    className="object-cover object-center"
  /> */}

        {/* gradient overlay */}
        <div className=""></div>

        {/* content wrapper */}
        <div className="relative z-10 h-full flex flex-col gap-6 xl:flex-row items-center justify-center lg:justify-between container mx-auto px-5 max-lg:pt-12 lg:pt-44">
          {/* left content */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="text-start w-1/2 max-xl:mt-8 max-xl:w-full font-poppins"
          >
            {/* <h3 className="text-secondaryColor text-lg font-poppins font-medium">
              {category}
            </h3> */}
            <h1 className="heading-text my-1">{title}</h1>
            {/* <p>
             Chandramouli Venkatesan and Valerie Monchi discuss how Barclays and Capgemini transformed Barclays Live.
            </p> */}
            <div className="relative flex  py-2  rounded-md flex-col md:flex-row gap-2 md:gap-10 my-4">
              {/* <div className=" flex flex-col">
                <p className=" tracking-wide font-poppins text-textColor font-medium">
                  Client
                </p>
                <p className="text-primaryColor text-lg font-poppins font-medium">
                  Barclays
                </p>
              </div> */}
              {/* <div className="w-1 h-full bg-primaryColor"></div> */}
              <div className=" flex flex-col">
                <p className=" tracking-wide font-poppins text-textColor font-medium">
                  Indusry
                </p>
                <p className="text-primaryColor text-lg font-poppins font-medium">
                 {category}
                </p>
              </div>
            </div>
            {technologiesCard && technologiesCard.length > 0 && (
              <>
                <h3 className="tracking-wide font-poppins text-textColor font-medium">
                  Technologies
                </h3>
                <div className="flex flex-row gap-4  items-center justify-start flex-wrap">
                  {technologiesCard.map((tech, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-1 py-2 "
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

          {/* optional right-side image block */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="items-center w-full h-full overflow-hidden md:flex-1 flex"
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
      </section>
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
      <div className="relative xl:-mt-24">
        {" "}
        {/* push up 48 (12rem) into hero */}
        <div className="p-6 rounded-lg container   mx-auto">
          <div className="markdown-content prose prose-lg text-justify max-w-full prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </div>
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
