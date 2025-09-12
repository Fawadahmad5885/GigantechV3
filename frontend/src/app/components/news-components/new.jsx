// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";
// import Image from "next/image";

// const NewsSection = ({ data, showViewAll = true, hideHeader = false }) => {
//   const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL; // Replace with your actual Strapi URL
//   const sortedNews = (data || []).sort((a, b) => a.order - b.order); // sort by order
//   const [visibleCount, setVisibleCount] = useState(3); // Initial visible items to 3

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handleViewMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   };

//   const displayedNews = showViewAll
//     ? sortedNews.slice(0, visibleCount)
//     : sortedNews;

//   return (
//     <section className="h-auto bg-gray-100 relative mx-auto pb-[5%]">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         {!hideHeader && (
//           <div className="px-5 font-poppins text-center">
//             <h2 className="heading-text text-textColor">News and Events</h2>
//             <p className="section-description">
//               Stay updated with our latest insights, product updates, and
//               industry news
//             </p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 mt-10 mx-auto component-width md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {displayedNews.map((item) => {
//             const imageUrl = item.image?.formats?.medium?.url;
//             const fullImageUrl = imageUrl?.startsWith("/")
//               ? `${STRAPI_URL}${imageUrl}`
//               : imageUrl;

//             return (
//               <Link key={item.id} href={`/news/${item.slug}`} className="flex">
//                 <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
//                   {/* Featured Image */}
//                   <div className="relative h-48 overflow-hidden">
//                     {item.image?.url ? (
//                       <Image
//                         src={fullImageUrl}
//                         alt={item.title}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                         <ExternalLink className="w-12 h-12 text-white opacity-50" />
//                       </div>
//                     )}

//                     {/* Upcoming Tag */}
//                     {item.type === "event" &&
//                       new Date(item.date) > new Date() && (
//                         <div className="absolute top-3 right-3 z-10">
//                           <div className="relative">
//                             <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300 flex items-center gap-1">
//                               <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                               UPCOMING
//                             </span>
//                             <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md opacity-30 -z-10"></div>
//                           </div>
//                         </div>
//                       )}
//                   </div>

//                   {/* Card Content */}
//                   <div className="p-6 flex flex-col flex-grow">
//                     {/* Date & Author */}
//                     <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{formatDate(item.date)}</span>
//                       </div>
//                       {item.type === "blog" && item.author && (
//                         <div className="flex items-center gap-1">
//                           <User className="w-4 h-4" />
//                           <span>{item.author}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primaryColor transition-colors duration-300">
//                       {item.title}
//                     </h3>

//                     {/* Tags */}
//                     {item.tags?.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {item.tags.map((tag) => (
//                           <span
//                             key={tag.id}
//                             className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
//                           >
//                             #{tag.tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Description */}
//                     <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
//                       {item.content}
//                     </p>

//                     {/* Divider */}
//                     <div className="border-b border-gray-200 my-2" />

//                     {/* Bottom Row: Learn More & Date */}
//                     <div className="flex justify-between items-center text-sm mt-auto">
//                       <span className="text-primaryColor font-medium hover:underline">
//                         Learn More
//                       </span>
//                       <span className="text-gray-500">
//                         {formatDate(item.date)}
//                       </span>
//                     </div>
//                   </div>
//                 </article>
//               </Link>
//             );
//           })}
//         </div>

//         {showViewAll && (
//           <div className="text-center mt-8">
//             <Link
//               href="/news"
//               className="inline-flex items-center px-8 py-3 text-primaryColor text-lg font-medium rounded-lg transition-colors duration-300 group"
//             >
//               <span>View All News</span>
//               <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default NewsSection;
