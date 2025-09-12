import technologies from "../../import/technologies.json";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";

export default async function uploadTechnologies({ strapi }) {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    strapi.log.info(`Upload directory: ${uploadsDir}`);

    const existingTechs = await strapi.entityService.findMany(
      "api::technology.technology",
      { fields: ["id", "slug"] }
    );
    const existingSlugs = new Set(existingTechs.map(tech => tech.slug));

    for (const tech of technologies) {
      if (existingSlugs.has(tech.slug)) {
        strapi.log.info(`Skipping existing technology: ${tech.name}`);
        continue;
      }

      let logoId = null;

      if (tech.logo) {
        const filename = tech.logo;
        const filePath = path.join(uploadsDir, filename);
        
        try {
          await fs.access(filePath);
          const fileStats = await fs.stat(filePath);
          const mimeType = mime.lookup(filename) || "application/octet-stream";

          // Create file record directly in the database
          const fileEntry = await strapi.db.query('plugin::upload.file').create({
            data: {
              name: filename,
              alternativeText: tech.name,
              caption: tech.name,
              width: 0,  // You can get these from image metadata if needed
              height: 0,
              formats: null,
              hash: filename.replace(/\.[^/.]+$/, ""),
              ext: path.extname(filename).slice(1),
              mime: mimeType,
              size: fileStats.size,
              url: `/uploads/${filename}`,
              provider: 'local',
              folderPath: '/',
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          });

          logoId = fileEntry.id;
          strapi.log.info(`Created file record for ${filename} with ID ${logoId}`);
        } catch (err) {
          strapi.log.error(`File error for ${filename}: ${err.message}`);
          continue;
        }
      }

      await strapi.entityService.create("api::technology.technology", {
        data: {
          name: tech.name,
          category: tech.category,
          slug: tech.slug,
          tooltip: tech.tooltip,
          logo: logoId ? { id: logoId } : null,
          publishedAt: new Date(),
        },
      });
      strapi.log.info(`Created technology: ${tech.name}`);
    }
  } catch (err) {
    strapi.log.error("Script failed:", err);
  }
}