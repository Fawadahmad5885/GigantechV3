import { USE_LOCAL } from "../utils/config";
export const sendContactForm = async (data) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const result = await response.json();
  return result;
};

// utils/media.js
export function getStrapiMedia(url) {
  if (!url || typeof url !== 'string') {
    return '/default-tech-image.png'; // Fallback image
  }

  // Clean path (remove duplicate uploads)
  const cleanUrl = url
    .replace(/^\/?uploads\/uploads\//, '')
    .replace(/^\/?uploads\//, '');

  if (USE_LOCAL) {
    // Local files are in /content-export/uploads/
    return `/content-export/uploads/${cleanUrl}`;
  }

  // Strapi production URL
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/${cleanUrl}`;
}

export const revalidate = 30;

export async function fetchStrapi(endpoint) {
  const [baseName, queryString] = endpoint.split('?');

  if (USE_LOCAL) {
    console.log(`[DEBUG] Fetching local data for ${baseName}`);
    try {
      let data;
      // Server-side fetch
      if (typeof window === 'undefined') {
        const fs = require('fs/promises');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'public', 'content-export', `${baseName}.json`);
        
        try {
          await fs.access(filePath);
        } catch {
          console.error(`Local file not found: ${filePath}`);
          throw new Error('Local file not found');
        }
        
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContents);
        data = jsonData.data || jsonData;
      }
      // Client-side fetch
      else {
        const res = await fetch(`/content-export/${baseName}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const jsonData = await res.json();
        data = jsonData.data || jsonData;
      }

      // If there's a query string for filtering, apply it
      if (queryString && Array.isArray(data)) {
        const params = new URLSearchParams(queryString);
        const filterRegex = /filters\\[(\w+)\\]\\[\\$eq\\]/;
        
        for (const [key, value] of params.entries()) {
          const match = key.match(filterRegex);
          if (match) {
            const filterField = match[1];
            // Filter the array based on the slug or other fields
            return data.filter(item => item.attributes[filterField] === value);
          }
        }
      }

      return data;

    } catch (err) {
      console.error(`Local fetch failed for ${baseName}:`, err.message);
      return null;
    }
  }

  // Strapi API fallback (no changes here)
  console.log(`[DEBUG] Fetching from Strapi for ${endpoint}`);
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`Strapi fetch failed for ${endpoint}:`, err.message);
    return null;
  }
}

// export const sendContactForm = async (data) => {
//     const response = await fetch("/api/contact", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//     });
  
//     const result = await response.json();
//     return result;
//   };

//   export function getStrapiMedia(url) {
//     if (typeof url !== 'string') return null;
//     const cleanUrl = url.replace(/^\/\//, '/');
//     if (cleanUrl.startsWith('http')) return cleanUrl;
//     return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${cleanUrl}`;
//   }
  
//   export const revalidate = 30;
  
//   // This function is designed to fetch data from Strapi. It takes API endpoint.
//   export async function fetchStrapi(path) {
//     const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${path}`;
//     const res = await fetch(url, { next: { revalidate } });
  
//     if (!res.ok) {
//       console.error(`❌ Strapi fetch error for ${path}:`, res.status, res.statusText);
//       return null;
//     }
  
//     const body = await res.json();
//     return body.data;
//   }