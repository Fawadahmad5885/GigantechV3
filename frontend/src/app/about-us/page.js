import { getBaseUrl } from "../../utils/baseUrl";
import AboutUsClient from "../components/about-page-components/AboutUsClient";
import { fetchStrapi } from "../../lib/api";

export async function generateMetadata() {
  // About page meta data  API endpoint
  const aboutMeta = await fetchStrapi(
    "about-meta?populate[aboutMetaData][populate][0]=metaImage"
  );
  const metaData = aboutMeta?.aboutMetaData;
  return {
    // Return dynamic metadata (fetched from strapi)
    title: metaData?.metaTitle,
    description: metaData?.metaDescription,
    keywords: metaData?.keyWords,
    openGraph: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      url: `${getBaseUrl()}/about`,
      images: [
        {
          url: `${getBaseUrl()}/about-page-preview.png`,
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
          url: `${getBaseUrl()}/preview.jpg`,
          width: 1200,
          height: 630,
          alt: metaData?.metaDescription,
        },
      ],
      card: "summary_large_image",
      creator: "SmachStack",
    },
    canonicalUrl: `${getBaseUrl()}/about`,
  };
}

export default async function AboutPage() {
  const aboutPageData = await fetchStrapi(
    "about-pages?populate[about_hero][populate][Button]=*&populate[about_hero][populate][aboutHeroCard][populate][image][fields]=url&populate[partner_choice][populate][partnerChoiceCard][populate][image][fields]=url&populate[about_story]=*" +
      "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&"
  );
  const aboutData = aboutPageData?.[0] || {};
  
  const Herodata = aboutData.about_hero;

  const partnerChoiceData = aboutPageData?.[0] || {};
  const partnerchoices = partnerChoiceData.partner_choice;

  const aboutStoryData = aboutPageData?.[0] || {};
  const aboutStory = aboutStoryData.about_story;

  const contactSection = aboutPageData?.[0] || {};
  const contactFormData = contactSection.contact_section;
  const contactForm = contactFormData.contactForm;

  return (
    <AboutUsClient
      aboutHeroData={Herodata}
      partnerChoiceData={partnerchoices}
      aboutStory={aboutStory}
      contactSectionHeader={contactFormData}
      contactForm={contactForm}
    />
  );
}
