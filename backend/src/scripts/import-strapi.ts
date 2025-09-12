import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const importStrapiData = async () => {
  const importFile = path.join(__dirname, '../data/export-latest.tar.gz');

  if (!(await fs.pathExists(importFile))) {
    console.error('No export file found at', importFile);
    process.exit(1);
  }

  try {
    // Stop Strapi if running
    execSync('npm run strapi stop', { stdio: 'inherit' });

    // Import data
    execSync(`npm run strapi import -- --file ${importFile} --force`, {
      stdio: 'inherit',
    });

    console.log('Successfully imported Strapi data');
  } catch (error) {
    console.error('Error importing Strapi data:', error);
    process.exit(1);
  }
};

importStrapiData();