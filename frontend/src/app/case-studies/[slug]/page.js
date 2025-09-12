// app/pages/case-studies/[slug].jsx
import { fetchStrapi, getStrapiMedia } from "../../../lib/api";
import CaseStudyMain from "../../components/case-studies-components/CaseStudyMain";

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_USE_LOCAL_DATA) {
    try {
      const localData = await fetchStrapi("case-study-cards");
      return (localData || []).map((item) => ({
        slug: item.slug,
      }));
    } catch (error) {
      console.error("Failed to generate static paths from local data:", error);
      return [];
    }
  }

  try {
    const res = await fetchStrapi(
      "case-study-cards?fields=slug&populate[image][fields]=url&populate[technologiesCard][populate][image][fields]=url"
    );

    return (res || []).map((item) => ({
      slug: item.attributes?.slug || item.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static paths from Strapi:", error);
    return [];
  }
}

async function getCaseStudyData(slug) {
  let res;

  if (process.env.NEXT_PUBLIC_USE_LOCAL_DATA) {
    try {
      res = await fetchStrapi(
        `case-study-cards?filters[slug][$eq]=${slug}&populate[image][fields]=url&populate[technologiesCard][populate][image][fields]=url`
      );

      if (!res) return null;
      const caseStudy = res.find((item) => item.slug === slug);
      if (!caseStudy) return null;

      return {
        id: caseStudy.id,
        attributes: {
          ...caseStudy,
          image: caseStudy.image || null,
        },
      };
    } catch (error) {
      console.error("Local data error:", error);
      return null;
    }
  }

  // Strapi data fetching - UPDATED QUERY
  try {
    const query = `
      case-study-cards?
      filters[slug][$eq]=${encodeURIComponent(slug)}
      &populate[image]=*
    `.replace(/\s+/g, "");

    res = await fetchStrapi(query);

    if (!res || !res.data || !res.data.length) return null;

    const strapiCaseStudy = res.data[0];
    return {
      id: strapiCaseStudy.id,
      attributes: {
        ...strapiCaseStudy.attributes,
        image:
          strapiCaseStudy.attributes.image?.data?.attributes ||
          strapiCaseStudy.attributes.image,
      },
    };
  } catch (error) {
    console.error("Strapi fetch error:", error);
    return null;
  }
}

async function getContactData() {
  const endpoint =
    "case-studies-pages?populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][Input][fields]=label&" +
    "&populate[contact_section][populate][contactForm][populate][inputOptions][fields]=label,value&" +
    "&populate[contact_section][populate][contactForm][populate][serviceTitles][fields]=title&" +
    "&populate[contact_section][populate][footerSteps][fields]=*";

  const data = await fetchStrapi(endpoint);

  if (process.env.NEXT_PUBLIC_USE_LOCAL_DATA && Array.isArray(data)) {
    // Transform local contact data to match Strapi structure
    return {
      contact_section: data[0]?.contact_section || {},
      ...data[0],
    };
  }

  return data?.[0] || {};
}

export default async function CaseStudyDetail({ params }) {
  const { slug } = params;
  const [caseStudy, contactData] = await Promise.all([
    getCaseStudyData(slug),
    getContactData(),
  ]);

  if (!caseStudy) {
    return <div className="mt-12">Case study not found</div>;
  }

  // Normalize the data structure for the component
  const normalizedCaseStudy = {
    id: caseStudy.id,
    ...caseStudy,
  };

  return (
    <CaseStudyMain
      caseStudy={normalizedCaseStudy}
      contactSectionHeader={contactData.contact_section}
      contactForm={contactData.contact_section?.contactForm}
    />
  );
}
