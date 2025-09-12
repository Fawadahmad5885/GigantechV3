
import { getStrapiMedia } from "./api";

// Get all technology categories
export const getTechnologies = (rawData) => {
    // Access the first item's technologyChild array
    const techChildArray = rawData?.[0]?.technologyChild || [];
    return techChildArray.map(tech => ({
      id: tech.id,
      name: tech.title,
      slug: tech.title.toLowerCase().replace(/\s+/g, '-'),
    }));
  };
  
  export const getTechCards = (rawData, technologyName) => {
    const techChildArray = rawData?.[0]?.technologyChild || [];
    const technology = techChildArray.find(t => t.title === technologyName);
    
    return technology?.technologyTechCard?.map(card => ({
      id: card.id,
      name: card.title,
      image: getStrapiMedia(card.image?.url),
      tooltip: card.title,
    })) || [];
  };

