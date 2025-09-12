import HeroSection from "./components/HeroSection";
import OurClients from "./components/OurClients";
import Industries from "./components/industries-section/Industries";
import Services from "./components/services/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Technologies from "./components/technologies/Technologies";
import Contact from "./components/contact/Contact";
import Head from "next/head";
import { getBaseUrl } from "../utils/baseUrl";
import { fetchStrapi } from "../lib/api";
import NewsSection from "./components/news-components/NewsSection";
import CaseStudies from "./components/case-studies-components/caseStudies";
import AboutUsSection from "./components/about-us-section";
import AiTechnologiesSection from "./components/ai-technologies-section";

export async function generateMetadata() {
  const HomeMeta = await fetchStrapi(
    "home-meta?populate[homeMetaData][populate][0]=metaImage&populate[homeMetaData][populate][1]=openGraphImage"
  );
  const metaData = HomeMeta?.homeMetaData;

  const baseUrl = getBaseUrl();
  return {
    title: metaData?.metaTitle,
    description: metaData?.metaDescription,
    keywords: metaData?.keyWords,
    icons: {
    },
    openGraph: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      images: [
        {
          width: 1200,
          height: 630,
          alt: metaData?.metaTitle,
        },
      ],
      url: baseUrl,
    },
    twitter: {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
      images: [
        {
          // url: getStrapiMedia(metaData.openGraphImage.url),
          width: 1200,
          height: 630,
          alt: metaData?.metaTitle,
        },
      ],
      card: "summary_large_image",
      creator: "SmachStack",
    },
    canonicalUrl: `${baseUrl}/`,
  };
}

export default async function Home() {
  const landingPageData = await fetchStrapi(
    "landing-pages?populate[hero_sections][populate]=*" +
      "&populate[industries_section][populate][industryCard][populate][image][fields]=url,formats" +
      "&populate[services_section][populate][serviceCard][populate][image][fields]=url,formats" +
      "&populate[services_section][populate][backgroundImage][fields]=url,formats" +
      "&populate[about_section][populate][aboutImage][fields]=url" +
      "&populate[technologies_section][populate][backgroundImage][fields]=url,formats" +
      "&populate[technologies][populate][logo][fields]=url&populate[technologies][fields]=*" +
      "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
      "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
      "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
      "&populate[contact_section][populate][footerSteps][fields]=*&" +
      "&populate[clients_section][populate][Client][populate][clientLogo][fields]=url" +
      "&populate[case_studies_hero][populate][image][fields]=url,formats" +
      "&populate[case_study_cards][populate][image][fields]=url,formats" +
      "&populate[news_blogs_and_event][populate][image][fields]=url,formats" +
      "&populate[news_items][populate][image][fields]=url,formats"+
      "&populate[ai_technologies][populate][backgroundImage][fields]=url" +
      "&populate[ai_technologies][populate][icon][fields]=url" +
      "&populate[ai_technologies][populate][bullets][fields]=description"
  );

  const heroData = landingPageData?.[0] || {};
  const heroSections = heroData.hero_sections || [];
    const heroSectionData = heroSections[0] || {};

  const clientsdata = landingPageData?.[0] || {};
  const clients = clientsdata.clients_section;

  const aboutData = landingPageData?.[0] || {};
  const aboutUs = aboutData.about_section;

  const aiTechnologiesData = landingPageData?.[0] || {};
  const aiTechnologies = aiTechnologiesData.ai_technologies;
  const aiTechnologiesSort = aiTechnologies.sort((a, b) => a.order - b.order);

  const industries = landingPageData?.[0] || {};
  const industriesData = industries.industries_section;

  const services = landingPageData?.[0] || {};
  const servicesData = services.services_section;

  const technologiesHeader = landingPageData?.[0] || {};
  const techsHeader = technologiesHeader.technologies_section;

  const technologiesData = landingPageData?.[0] || {};
  const techs = technologiesData.technologies;

  const caseStudiesHeader = landingPageData?.[0] || {};
  const caseStudiesheader = caseStudiesHeader.case_studies_hero;

  const caseStudies = landingPageData?.[0] || {};
  const caseStudiesCards = caseStudies.case_study_cards;

  const newsAndBlogsHeaderData = landingPageData?.[0] || {};
  const newsAndBlogsHeader = newsAndBlogsHeaderData.news_blogs_and_event;

  const newsAndBlogsData = landingPageData?.[0] || {};
  const newsAndBlogs = newsAndBlogsData.news_items;

  const contactSection = landingPageData?.[0] || {};
  const contactFormData = contactSection.contact_section;
  const contactForm = contactFormData.contactForm;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Carousel Video",
              description: "A captivating video about our company and values.",
              thumbnailUrl: `${getBaseUrl()}/preview.jpg`,
              uploadDate: "2025-01-01",
              contentUrl: `${getBaseUrl()}/images/video1.mp4`,
              contentUrl: "https://www.smachstack.com/images/video1.mp4",
              embedUrl: `${getBaseUrl()}`,
            }),
          }}
        />
      </Head>
      <div className="w-full overflow-x-hidden">
        <HeroSection data={heroSectionData} />
        {clients[0]?.display !== false && <OurClients clientsLogo={clients} />}
        <WhyChooseUs aboutData={aboutUs} />
         <AiTechnologiesSection aiTechnologies = {aiTechnologiesSort} />
        <Industries headerData={industriesData} />
        <Services headerData={servicesData} />
        <Technologies headerData={techsHeader} technologies={techs} />
        <CaseStudies headerData={caseStudiesheader} cards={caseStudiesCards} />
        <NewsSection headerData={newsAndBlogsHeader} data={newsAndBlogs} />
        <Contact headerData={contactFormData} contactForm={contactForm} />
      </div>
    </>
  );
}
