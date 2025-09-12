"use client";
import Link from "next/link";
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";
import { getStrapiMedia } from "../../../lib/api";

const NewsCard = ({ item }) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const imageUrl = item.image?.formats?.medium?.url || item.featuredImage?.url;
  const fullImageUrl = imageUrl?.startsWith("/")
    ? `${STRAPI_URL}${imageUrl}`
    : imageUrl;

  return (
    <Link key={item.id} href={`/news-and-blogs/${item.slug}`} className="flex h-full   ">
      <article className="bg-white rounded-t-lg  shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-[500px] relative">
        {/* Featured Image */}
        <div className="relative h-56">
          {item.image?.url ? (
            <img
              src={getStrapiMedia(item.image.url)}
              alt={item.title}
              className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-t-lg">
              <ExternalLink className="w-12 h-12 text-white opacity-50" />
            </div>
          )}

          {/* Upcoming Tag */}
          {item.type === "event" && new Date(item.date) > new Date() && (
            <div className="absolute bottom-0 right-0 translate-y-1/2 z-10">
              <div className="relative">
                <span className="bg-orange-400 tracking-widest text-white text-xs font-bold px-4 py-2 shadow-lg border-white duration-300 flex items-center gap-1 self-end">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  UPCOMING
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 pb-2 flex flex-col flex-grow">
          <div className="flex flex-row justify-between">
            {/* Type & Author */}
            {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <span className="capitalize font-medium">{item.type}</span>
              </div>
              {item.type === "blog" && item.author && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                </>
              )}
            </div> */}
            <span className="text-gray-500 items-center">
              {formatDate(item.date)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-poppins font-medium text-lg  mb-3 line-clamp-2 group-hover:text-primaryColor transition-colors duration-300">
            {item.title}
          </h3>

          {/* Tags */}
          {/* {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                >
                  #{tag.tag}
                </span>
              ))}
            </div>
          )} */}

          {/* Description */}
          <div className="flex-grow">
            <p className="text-gray-600 mb-4 line-clamp-3">
              {item.description}
            </p>
          </div>

          {/* Divider */}
          {/* <div className="border-b border-gray-200 my-2" /> */}

          {/* Bottom Row: Learn More & Date */}
          <div className="flex justify-start items-center text-sm mt-auto mb-3">
            <div
              // href={`/case-studies/${item.slug}`}
              className="inline-flex items-center   text-primaryColor   rounded-lg transition-colors duration-300 group"
            >
              <span className="text-base font-poppins tracking-wide font-medium">Read more</span>
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
