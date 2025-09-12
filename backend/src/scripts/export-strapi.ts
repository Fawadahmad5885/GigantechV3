import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import tar from 'tar';

const exportStrapiData = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const exportDir = path.join(__dirname, '../data');
  const exportFile = path.join(exportDir, `export-${timestamp}.tar.gz`);
  const latestFile = path.join(exportDir, 'export-latest.tar.gz');

  // Ensure data directory exists
  await fs.ensureDir(exportDir);

  try {
    // Export Strapi data
    execSync(`npm run strapi export -- --file ${exportFile} --no-encrypt`, {
      stdio: 'inherit',
    });

    // Update latest file
    await fs.copyFile(exportFile, latestFile);

    console.log(`Successfully exported to ${exportFile} and updated ${latestFile}`);
  } catch (error) {
    console.error('Error exporting Strapi data:', error);
    process.exit(1);
  }
};

exportStrapiData();