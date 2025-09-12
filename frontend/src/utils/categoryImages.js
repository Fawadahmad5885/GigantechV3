import aiImage from "../../public/content-export/tech-categories-images/ai-technologies.png";
import webImage from "../../public/content-export/tech-categories-images/web-technologies.png";
import devopsImage from "../../public/content-export/tech-categories-images/devops-technologies.png";
import mobileImage from "../../public/content-export/tech-categories-images/mobiles-technologies.png";
import qaImage from "../../public/content-export/tech-categories-images/qa-technologies.png";
import embeddedImage from "../../public/content-export/tech-categories-images/embedded.png";

export const categoryImages = {
  "Artificial Intelligence": aiImage,
  "Mobile App Development": mobileImage,
  "Web Development": webImage,
  "Embedded AI": embeddedImage,
  "DevOps": devopsImage,
  "Quality Assurance": qaImage,
};

export const getCategoryImage = (categoryName) => {
  return categoryImages[categoryName] || "/images/categories/default.png";
};
