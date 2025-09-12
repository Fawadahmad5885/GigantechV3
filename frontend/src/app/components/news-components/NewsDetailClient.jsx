"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { scroller } from "react-scroll";
import Contact from "../../../app/components/contact/Contact";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/api";

const NewsDetailClient = ({
  newsArticle,
  contactSectionHeader,
  contactForm,
}) => {
  const attributes = newsArticle.attributes || newsArticle;
  const { image } = attributes;

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -85,
    });
  };
  const getImageUrl = () => {
    if (!image) return "/fallback-image.jpg";

    let imageUrl;

    if (image.url) {
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
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className=" relative bg-gradient-to-r from-backgroundColor/10  via-backgroundColor/50 to-backgroundColor">
      <div className="relative max-lg:pt-12 lg:pt-44 h-full  px-5 inset-0 flex flex-col gap-6 xl:flex-row items-center justify-center lg:justify-between container mx-auto  text-textColor">
        {/* {imageUrl && (
          <Image
            src={imageUrl}
            alt={newsArticle.title || "News article"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )} */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white  via-backgroundColor/50 to-backgroundColor"></div> */}

        {/* Hero Content */}
        <div className="relative z-10 h-full max-sm:px-4 flex flex-col xl:flex-row items-center">
          <div className="text-start w-full max-xl:mt-8 xl:w-1/2 font-poppins">
            <h1 className="heading-text my-1">
              {newsArticle.title || "Title not available"}
            </h1>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="items-center w-full  overflow-hidden md:flex-1 flex"
          >
            <Image
              src={imageUrl}
              alt="Case Study Background"
              width={800}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="">
        <div className="container sm:px-6 mx-auto max-sm:px-4 pb-12">
          {/* Meta Information Cards */}

          <div className="flex flex-row flex-wrap gap-6 mb-4 items-center">
            <div>
              {newsArticle.type === "blog" && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{newsArticle.author}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 " />
              <p className="">{formatDate(newsArticle.date)}</p>
            </div>
            <div>
              {newsArticle.type === "blog" && (
                <div className="flex items-center gap-1">
                  <span>{newsArticle.readminutes}</span>
                  <span>min read</span>
                </div>
              )}
            </div>
          </div>
          <div>
            {newsArticle.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 ">
                {newsArticle.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full "
                  >
                    #{tag.tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className=" py-6 rounded-lg">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
              <ReactMarkdown>{newsArticle.content}</ReactMarkdown>
            </div>
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
};

export default NewsDetailClient;
