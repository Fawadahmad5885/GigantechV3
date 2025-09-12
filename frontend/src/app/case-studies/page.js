// case-studies/page.js
import React from "react";
import { fetchStrapi, getStrapiMedia } from "../../lib/api";
import CaseStudiesClient from "../components/case-studies-components/CaseStudiesClient";
import { getBaseUrl } from "../../utils/baseUrl";

export async function generateMetadata() {
  const pageMetaData = await fetchStrapi(
    "news-meta?populate[newsMetaData][populate][0]=metaImage"
  );
  const metaData = pageMetaData?.newsMetaData;
  const { mataImage } = metaData?.[0] || {};
  const imageUrl = getStrapiMedia(mataImage?.url);
  return {
    title: metaData?.metaTitle,
    description: metaData?.metaDescription,
    keywords: metaData?.keyWords,
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
      creator: "Gigantech",
    },
    canonicalUrl: `${getBaseUrl()}/case-studies`,
  };
}
export default async function CaseStudies() {
  const caseStudiespageData = await fetchStrapi(
    "case-studies-pages?populate[case_studies_hero][populate]=*&populate[case_study_cards][populate][image][fields]=url,formats" +
      "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&"
  );

  const caseStudiesData = caseStudiespageData?.[0] || {};
  const heroData = caseStudiesData.case_studies_hero;
  const caseStudiesCardsData = caseStudiesData.case_study_cards;
  const contactFormData = caseStudiesData.contact_section;
  const contactForm = contactFormData.contactForm;

  return (
    <CaseStudiesClient
      heroSectionData={heroData}
      contactSectionHeader={contactFormData}
      contactForm={contactForm}
      caseStudiesCards={caseStudiesCardsData}
    />
  );
}
