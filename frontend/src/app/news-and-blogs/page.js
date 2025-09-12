// news/page.js
import React from "react";
import { fetchStrapi, getStrapiMedia } from "../../lib/api";
import NewsClient from "../components/news-components/NewsClient";
import { getBaseUrl } from "../../utils/baseUrl";

export async function generateMetadata() {
  // About page meta data  API endpoint
  const caseStudiesMetadata = await fetchStrapi(
    "news-meta?populate[newsMetaData][populate][0]=metaImage"
  );
  const metaData = caseStudiesMetadata?.caseStudiesMetaData;
  const { mataImage } = metaData?.[0] || {};
  const imageUrl = getStrapiMedia(mataImage?.url);
  return {
    title: metaData?.metaTitle || "News & Blogs | Gigantech - Insights on AI, Cloud, App & Web Development",
    description: metaData?.metaDescription || "Stay updated with the latest news, insights, and blogs from Gigantech. Explore articles on AI, App Development, Cloud Computing, Web Development, and digital transformation.",
    keywords: metaData?.keyWords || "Gigantech blog, tech news, AI insights, app development blogs, cloud computing articles, web development tips, digital transformation news",
    openGraph: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      url: imageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaData?.metaDescription,
        },
      ],
      type: "website",
    },
    twitter: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaData?.metaDescription,
        },
      ],
      card: "summary_large_image",
      creator: "SmachStack",
    },
    canonicalUrl: `${getBaseUrl()}/news-and-blogs`,
  };
}

export default async function News() {
  const newsAndBlogsPageData = await fetchStrapi(
    "news-blogs-pages?populate[news_blogs_and_event][populate]=*&populate[news_items][populate][image][fields]=url,formats" +
      "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&"
  );

  const newsAndBlogsData = newsAndBlogsPageData?.[0] || {};
  const heroData = newsAndBlogsData.news_blogs_and_event;
  const newsCards = newsAndBlogsData.news_items;
  const contactFormData = newsAndBlogsData.contact_section;
  const contactForm = contactFormData.contactForm;

  return (
    <NewsClient
      headerData={heroData}
      newsData={newsCards}
      contactSectionHeader={contactFormData}
      contactForm={contactForm}
    />
  );
}
